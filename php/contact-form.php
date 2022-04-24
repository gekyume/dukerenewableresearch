<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../vendors/phpmailer/src/Exception.php';
require '../vendors/phpmailer/src/PHPMailer.php';
require '../vendors/phpmailer/src/SMTP.php';

if($_SERVER["REQUEST_METHOD"] == "POST") {
	// Sender Data
	$senderName = trim(strip_tags($_POST["name"]));
	$senderEmail = filter_var(trim(strip_tags($_POST["email"])), FILTER_SANITIZE_EMAIL);
	$senderSubject = trim(strip_tags($_POST["subject"]));
	$senderMessage = trim(htmlentities($_POST["message"]));

	if(empty($senderName) || empty($senderEmail) || empty($senderSubject) || empty($senderMessage)) {
		// Set a 400 (bad request) response code and exit
		http_response_code(400);
		echo "Please complete the form and try again!";
		exit;
	} else { 
		if(!filter_var($senderEmail, FILTER_VALIDATE_EMAIL)) { 
			// Set a 400 (bad request) response code and exit
			http_response_code(400);
			echo "Invalid email format!";
			exit;
		}
	}

	$mail = new PHPMailer(true);

	try {
    //Server settings
    $mail->isSMTP();                                     	// Send using SMTP
    $mail->Host       = 'smtp1.example.com';             	// Set the SMTP server to send through
    $mail->SMTPAuth   = true;                            	// Enable SMTP authentication
    $mail->Username   = 'user@example.com';              	// SMTP username
    $mail->Password   = 'secret';                        	// SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  	// Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 587;                             	// TCP port to connect to

    //Recipients
    $mail->setFrom($senderEmail, $senderName);
    $mail->addAddress('user@example.com', 'Your Name');     // Add a recipient
    $mail->addReplyTo($senderEmail, $senderName);

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $senderSubject;
    $mail->Body    = "<b>Name</b>: $senderName<br><b>Email</b>: $senderEmail<br><br><b>Message</b>: $senderMessage";
    $mail->AltBody = "Name: $senderName\nEmail: $senderEmail\n\nMessage: $senderMessage";

    $mail->send();
    echo 'Your message has been sent!';
	} catch (Exception $e) {
		http_response_code(400);
	  echo "Mailer Error: {$mail->ErrorInfo}";
	}

} else { 
	// Not a POST request, set a 403 (forbidden) response code
	http_response_code(403);
}

?>