<?php
if(isset($_POST["data"])){
	require_once("db.php");

	$mail = $_POST["data"];

	$stmt = $pdo->prepare("SELECT * FROM bookhistory WHERE bookreader='{$mail}' ORDER BY id DESC");
	$stmt->execute();
	$historySql = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$stmt = null;
	$pdo = null;
	echo json_encode($historySql);
}else echo "false";
?>
