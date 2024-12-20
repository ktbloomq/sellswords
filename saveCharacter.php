<?php
header('Content-Type: application/json');
$config = require 'config.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $rawPostData = file_get_contents("php://input");
  $pdo = new PDO(
    "mysql:host={$config['db_host']};dbname={$config['db_name']}",
    $config['db_user'],
    $config['db_pass']
  );
  
  $stmt = $pdo->prepare("INSERT INTO characters (name, data) VALUES (:name, :data)");
  $stmt->bindValue(':name', $_GET['name']);
  $stmt->bindValue(':data', $rawPostData);
  
  $stmt->execute();
  echo $rawPostData;
  $pdo = null; 
}
?>