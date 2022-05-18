<?php

error_reporting(E_ERROR);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once('./config.php');

$steal_span = $config["steal_position"];

// Interrupt if game has ended
if($config["end_time"] < time()){
  echo(json_encode([
    'status' => false,
    'message' => 'Game is over',
    'data' => []
  ]));
  die();
}

$users_file = __DIR__ . '/data/users';
$leadb_file = __DIR__ . '/data/leaderboard';

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
$email = strtolower($data['email']);
$current_users = array();

if($email){

  $current_users = json_decode(file_get_contents($users_file), true);
  $username = $current_users[$email];
  if(!$username){
    echo(json_encode([
      'status' => false,
      'message' => 'User not found',
      'data' => []
    ]));
    die();
  }

  $fp = fopen($leadb_file, 'r+');
  if(flock($fp, LOCK_EX)){

    $current_lb = json_decode(fread($fp, filesize($leadb_file)), true);
    if (($key = array_search($username, $current_lb)) !== false) {
      // Remove from previous position
      unset($current_lb[$key]);
    }

    $span = min($steal_span, count($current_lb));
    $new_pos = rand(1, $span);
    array_splice($current_lb, $new_pos-1, 0, $username);

    ftruncate($fp, 0);    //Truncate the file to 0
    rewind($fp);          //Set write pointer to beginning of file
    fwrite($fp, json_encode($current_lb));
    flock($fp, LOCK_UN);  //Unlock File
    echo(json_encode([
      'status' => true,
      'message' => 'Successfully stole position #' . $new_pos,
      'data' => [
        'position' => $new_pos,
      ]
    ]));
    die();
  } else {
    echo(json_encode([
      'status' => false,
      'message' => 'Could not lock file for writing',
      'data' => []
    ]));
    die();
  }
}
