<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=schooll1_db;charset=utf8mb4','schooll1_user','VI?ZG,dHu*uJ');
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, 1);
}catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
    exit();
}
?>