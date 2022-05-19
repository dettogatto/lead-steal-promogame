<?php
error_reporting(E_ERROR);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once('./config.php');
require_once('./activecampaign-api-v3.php');
$ac = new ActiveCampaign_API_Gatto();

$file_path = __DIR__ . '/data/users';

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
$email = strtolower(trim($data['email']));
$username = trim($data['username']);
$current_users = array();

if($email && $username){

  $fp = fopen($file_path, 'r+');
  if(flock($fp, LOCK_EX)){

    $current_users = json_decode(fread($fp, filesize($file_path)), true);
    if(!$current_users[$email]){

      foreach($current_users as $u){
        if(strtolower($u) === strtolower($username)){
          // Duplicate username check
          echo(json_encode([
            'status' => false,
            'message' => 'Username is taken',
            'data' => []
          ]));
          die();
        }
      }

      $current_users[$email] = $username;
      ftruncate($fp, 0);    //Truncate the file to 0
      rewind($fp);          //Set write pointer to beginning of file
      fwrite($fp, json_encode($current_users));
      flock($fp, LOCK_UN);  //Unlock File

      if($config["active_campaign"]){ // AC
        $fields = [];
        $fields[$config["ac_nickname_field"]] = $username;
        $ac->super_sync_contact(
          ["email" => $email],
          [$config["ac_list"]],
          NULL,
          $fields
        );
      }

      echo(json_encode([
        'status' => true,
        'message' => 'Successfully logged in',
        'data' => [
          'email' => $email,
          'username' => $username
        ]
      ]));
      die();

    } else {
      echo(json_encode([
        'status' => false,
        'message' => 'Duplicate user email',
        'data' => []
      ]));
      die();
    }

  } else {
    echo(json_encode([
      'status' => false,
      'message' => 'Could not lock file for writing',
      'data' => []
    ]));
    die();
  }

} elseif($email) {

  if(file_exists($file_path)){
    $current_users = json_decode(file_get_contents(__DIR__ . '/data/users'), true);
  }

  if($current_users[$email]){
    echo(json_encode([
      'status' => true,
      'message' => 'Successfully logged in',
      'data' => [
        'email' => $email,
        'username' => $current_users[$email]
      ]
    ]));
    die();
  } else {

    if($config["active_campaign"]){ // AC
      $ac->super_sync_contact(
        ["email" => $email],
        [$config["ac_list"]]
      );
    }

    echo(json_encode([
      'status' => true,
      'message' => 'Successfully signed up',
      'data' => [
        'email' => $email
      ]
    ]));
    die();
  }

}

echo(json_encode([
  'status' => false,
  'message' => 'Something went wrong',
  'data' => []
]));
