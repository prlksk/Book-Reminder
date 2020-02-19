<?php
if(isset($_POST["data"])){
	require_once("db.php");

	$data = $_POST["data"];
	$bookid = $data[0];
	$bookname = $data[1];
	$bookwriter = $data[2];
	$username = $data[3];
	$start = $data[4];
	$mail = $data[5];

	$sql = "
		UPDATE books SET bookreader='{$username}' WHERE bookid='{$bookid}';
		UPDATE users SET active=1 WHERE username='{$username}';
		INSERT INTO bookhistory(bookid, bookname, bookwriter, bookreader, active, time) VALUES('{$bookid}', '{$bookname}', '{$bookwriter}', '{$mail}', 1, {$start});
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
