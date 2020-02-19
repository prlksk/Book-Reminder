<?php
if(isset($_POST["data"])){
	require_once("db.php");

	$info = $_POST["data"];

	$stmt = $pdo->prepare("SELECT * FROM books WHERE bookname LIKE '%{$info}%' OR bookwriter LIKE '%{$info}%' OR bookid LIKE '%{$info}%'");
	$stmt->execute();
	$bookSearchSql = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$stmt = null;
	$pdo = null;
	echo json_encode($bookSearchSql);
}else echo "false";
?>
