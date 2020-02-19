<?php
if(isset($_POST["data"])){
	require_once("db.php");

	$data = $_POST["data"];
	$user = $data[0];
	$mail = $data[2];

	$stmt = $pdo->prepare("SELECT * FROM users WHERE username='{$user}' OR mail='{$mail}'");
	$stmt->execute();
	$count = $stmt->rowCount();

	if($count == 1) {
		$stmt = null;
		$pdo = null;
		echo "same";
	}else {
		$password = $data[1];
		$usercode = substr($password, 0, 6);
			
		$sql = "INSERT INTO users(username, password, mail, usercode)
		VALUES('{$user}', '{$password}', '{$mail}', '{$usercode}')";
	
		$stmt = $pdo->prepare($sql);
		$stmt->execute();
		$count = $stmt->rowCount();

		$stmt = null;
		$pdo = null;
			
		if($count == 1) echo json_encode(["true", $usercode]);
		else echo "false";
	}
}else echo "false";
?>
