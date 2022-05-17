<?php
error_reporting(E_ERROR);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

$content = file_get_contents("./data/leaderboard");

if(!$content){
  $content = '[]';
}

echo($content);
