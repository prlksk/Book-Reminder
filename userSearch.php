<?php
if(isset($_POST["data"])){
	require_once("db.php");

	$info = $_POST["data"];

	$stmt = $pdo->prepare("SELECT * FROM users WHERE username LIKE '%{$info}%'");
	$stmt->execute();
	$userSearchSql = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$stmt = null;
	$pdo = null;
	echo json_encode($userSearchSql);
}else echo "false";
?>
