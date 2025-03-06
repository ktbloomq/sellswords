<?php
header('Content-Type: application/json');
$config = require 'config.php';
  $pdo = new PDO(
    "mysql:host={$config['db_host']};dbname={$config['db_name']}",
    $config['db_user'],
    $config['db_pass']
  );

  $stmt = $pdo->prepare("SELECT data FROM characters WHERE name=:name");
  $stmt->bindValue(':name', $_GET['name']);

  $stmt->execute();
  $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo $results[0]['data'];
  $pdo = null; 
?>