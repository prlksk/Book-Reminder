<?php
if(isset($_POST["data"])){
	require_once("db.php");

	$data = $_POST["data"];
	$bookname = $data[0];
	$bookwriter = $data[1];
	$username = $data[2];
	$mail = $data[3];

	$sql = "
		UPDATE books SET bookreader=null WHERE bookname='{$bookname}' AND bookwriter='{$bookwriter}';
		UPDATE users SET active=0 WHERE username='{$username}';
		UPDATE bookhistory SET active=0 WHERE bookreader='{$mail}' AND active=1;
	";

	$stmt = $pdo->prepare($sql);
	$stmt->execute();
	$count = $stmt->rowCount();

	$stmt = null;
	$pdo = null;

	if($count == 1) echo "true";
	else echo "false";
}else echo "false";
?>
