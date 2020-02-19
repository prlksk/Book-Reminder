<?php
if(isset($_POST["data"])){
	require_once("db.php");

	$data = $_POST["data"];
	$username = $data[0];
	$usercode = $data[1];

	$stmt = $pdo->prepare("SELECT * FROM users WHERE username='{$username}' AND usercode='{$usercode}'");
	$stmt->execute();
	$userSql = $stmt->fetchAll(PDO::FETCH_ASSOC);

	if(count($userSql) == 1){
		$stmt = null;
		$pdo = null;
		echo json_encode($userSql[0]);
	}else{
		$stmt = null;
		$pdo = null;
		echo "false";
	}
}else echo "false";
?>
