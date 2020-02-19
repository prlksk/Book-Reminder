<?php
require 'mailer.php';
require '../api/db.php';

function microtime2(){
    list($usec, $sec) = explode(" ", microtime());
    return ((int)$usec + (int)$sec);
}

$time = microtime2()*1000;
$day = 1000*60*60*24;

$sql = "SELECT bookreader FROM bookhistory WHERE (20-(CEILING(({$time} - time) / 86400000)))=15 AND active=1";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$readerSql = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stmt = null;
$pdo = null;

$mail = new PHPMailer();

try {                   
    $mail->isSMTP();                     
    $mail->SMTPAuth   = true;                                                    
    $mail->Host       = 'mail.schoollibrarybook.com';                          
    $mail->Port       = 587; 
    $mail->SMTPSecure = 'tls';                    
    $mail->Username   = 'admin@schoollibrarybook.com';                     
    $mail->Password   = 'd^hx-e,w9B@6';     

    $mail->SetFrom('admin@schoollibrarybook.com', 'Library Alert');
    for($i = 0; $i<count($readerSql);$i++) $mail->addAddress($readerSql[$i]["bookreader"]);
         
    $mail->Subject = 'Library Alert - 15 Days';
    $mail->MsgHTML('you have 15 days to <b>return the book!</b>');
    $mail->AltBody = 'you have 15 days to return the book!';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>