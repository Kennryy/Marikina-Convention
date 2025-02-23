<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // PHPMailer dependency

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = $_POST["fullName"];
    $contactNumber = $_POST["contactNumber"];
    $emailAddress = $_POST["emailAddress"];
    $eventType = $_POST["eventType"];
    $eventDate = $_POST["eventDate"];
    $eventTime = $_POST["eventTime"];
    $clientRequest = $_POST["clientRequest"];

    // Generate Invoice Content
    $invoiceContent = "
        <h2>Reservation Invoice</h2>
        <p><strong>Name:</strong> $fullName</p>
        <p><strong>Contact Number:</strong> $contactNumber</p>
        <p><strong>Email:</strong> $emailAddress</p>
        <p><strong>Event Type:</strong> $eventType</p>
        <p><strong>Event Date:</strong> $eventDate</p>
        <p><strong>Event Time:</strong> $eventTime</p>
        <p><strong>Special Requests:</strong> $clientRequest</p>
        <p><strong>Status:</strong> Pending Approval</p>
    ";

    // Send Email
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@gmail.com'; // Replace with your email
        $mail->Password = 'your-email-password'; // Use App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('your-email@gmail.com', 'Marikina Convention Center');
        $mail->addAddress($emailAddress, $fullName);

        $mail->isHTML(true);
        $mail->Subject = 'Your Reservation Invoice - Marikina Convention Center';
        $mail->Body = $invoiceContent;

        $mail->send();
        echo json_encode(["status" => "success", "message" => "Email sent successfully!"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Email sending failed: {$mail->ErrorInfo}"]);
    }
}
?>
