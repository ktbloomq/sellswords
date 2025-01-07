<?php
header('Content-Type: application/json');
$config = require 'config.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $rawPostData = file_get_contents("php://input");
  try {
    $pdo = new PDO(
      "mysql:host={$config['db_host']};dbname={$config['db_name']}",
      $config['db_user'],
      $config['db_pass']
    );
    
    $getstmt = $pdo->prepare("SELECT data FROM characters WHERE name=:name");
    $getstmt->bindValue(':name', $_GET['name']);
    $getstmt->execute();
    if($getstmt->rowCount()==0) {
      $stmt = $pdo->prepare("INSERT INTO characters (name, data) VALUES (:name, :data)");
      $stmt->bindValue(':name', $_GET['name']);
      $stmt->bindValue(':data', $rawPostData);
      $stmt->execute();
    } else {
      $stmt = $pdo->prepare("UPDATE characters SET data = :data WHERE name = :name");
      $stmt->bindValue(':name', $_GET['name']);
      $stmt->bindValue(':data', $rawPostData);
      $stmt->execute();
    }
    echo $rawPostData;
    $pdo = null; 
  } catch (Exception $e) {
    http_response_code(500);
  }
}
?>