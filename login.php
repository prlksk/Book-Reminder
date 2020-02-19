<?php
if(isset($_POST["data"])){
	require_once("db.php");

	$data = $_POST["data"];

	$username = $data[0];
	$password = $data[1];
	$usercode = substr($password, 0, 6);

	$stmt = $pdo->prepare("SELECT * FROM users WHERE username='{$username}' AND password='{$password}'");
	$stmt->execute();
	$count = $stmt->rowCount();

	$stmt = null;
	$pdo = null;

	if($count == 1) echo json_encode(["true", $usercode]);
	else if($count == 0) echo "wrong";
	else echo "false";
}else echo "false";
?>
