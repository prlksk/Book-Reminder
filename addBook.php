<?php
if(isset($_POST["data"])){
	require_once("db.php");

	$data = $_POST["data"];
	$bookid = $data[0];
	$bookname = $data[1];
	$bookwriter = $data[2];

	$stmt = $pdo->prepare("SELECT * FROM books WHERE bookid='{$bookid}'");
	$stmt->execute();
	$count = $stmt->rowCount();

	if($count == 1) {
		$stmt = null;
		$pdo = null;
		echo "book";
	}else {
		$sql = "INSERT INTO books(bookid, bookname, bookwriter) VALUES('{$bookid}', '{$bookname}', '{$bookwriter}')";
	
		$stmt = $pdo->prepare($sql);
		$stmt->execute();
		$count = $stmt->rowCount();

		$stmt = null;
		$pdo = null;
			
		if($count == 1) echo "true";
		else echo "false";
	}
}else echo "false";
?>
