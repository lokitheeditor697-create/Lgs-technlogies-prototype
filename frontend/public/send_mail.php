<?php
// StackCP / ServerByte PHP Automated Mailer for LGS Technologies
// Handles Offer Letters and Completion Certificates with PDF Attachments

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Read raw POST body
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data || !isset($data['to']) || !isset($data['type'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid request payload. Required: to, type"]);
    exit();
}

$to = filter_var($data['to'], FILTER_SANITIZE_EMAIL);
$name = isset($data['name']) ? htmlspecialchars($data['name']) : 'Student';
$type = strtoupper($data['type']); // OFFER or CERTIFICATE
$domain = isset($data['domain']) ? htmlspecialchars($data['domain']) : 'Internship';
$filename = isset($data['filename']) ? $data['filename'] : ($type === 'OFFER' ? 'Offer_Letter.pdf' : 'Certificate.pdf');
$attachmentBase64 = isset($data['attachmentBase64']) ? $data['attachmentBase64'] : null;

$senderName = "LGS Technologies";
$fromEmail = "lgstechnologiess@gmail.com";

// Prepare Subject & HTML Body based on type
if ($type === 'OFFER') {
    $subject = "🎉 Congratulations! Your Official Internship Offer Letter - " . $domain;
    $htmlContent = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: "Segoe UI", Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e5e7eb; }
            .header { background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 35px 25px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
            .header p { margin-top: 8px; font-size: 14px; opacity: 0.9; }
            .content { padding: 30px 25px; line-height: 1.6; }
            .badge { display: inline-block; background: #eff6ff; color: #1d4ed8; font-weight: 700; padding: 6px 14px; border-radius: 20px; font-size: 13px; margin-bottom: 15px; border: 1px solid #bfdbfe; }
            .footer { background: #fafafa; padding: 20px 25px; text-align: center; font-size: 12px; color: #6b7280; border-t: 1px solid #f3f4f6; }
            .btn { display: inline-block; background: #2563eb; color: #ffffff !important; font-weight: bold; text-decoration: none; padding: 12px 26px; border-radius: 10px; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>LGS Technologies</h1>
                <p>Learn • Build • Grow</p>
            </div>
            <div class="content">
                <div class="badge">Official Offer Confirmation</div>
                <h2 style="color: #111827; margin-top: 0;">Congratulations, ' . $name . '! 🎉</h2>
                <p>We are thrilled to officially welcome you to the <strong>' . $domain . '</strong> Internship Program at LGS Technologies!</p>
                <p>Please find your official <strong>Internship Offer Letter</strong> attached to this email. It outlines your program duration, guidelines, and learning objectives.</p>
                <p style="background: #f9fafb; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 6px;">
                    <strong>Next Steps:</strong><br>
                    1. Review and save your attached Offer Letter.<br>
                    2. Access your student dashboard to track progress and modules.<br>
                    3. Complete your hands-on tasks to earn your verified certificate.
                </p>
                <p>If you have any questions, feel free to reply directly to this email or reach us at <a href="mailto:lgstechnologiess@gmail.com" style="color: #2563eb;">lgstechnologiess@gmail.com</a>.</p>
                <br>
                <p>Warm Regards,<br><strong>LGS Technologies Team</strong></p>
            </div>
            <div class="footer">
                &copy; ' . date("Y") . ' LGS Technologies. All rights reserved.<br>
                Chennai, Tamil Nadu, India
            </div>
        </div>
    </body>
    </html>';
} else {
    // CERTIFICATE EMAIL
    $subject = "🎓 Congratulations! Your Official Internship Certificate - " . $domain;
    $htmlContent = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: "Segoe UI", Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e5e7eb; }
            .header { background: linear-gradient(135deg, #059669, #10b981); padding: 35px 25px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
            .header p { margin-top: 8px; font-size: 14px; opacity: 0.9; }
            .content { padding: 30px 25px; line-height: 1.6; }
            .badge { display: inline-block; background: #ecfdf5; color: #047857; font-weight: 700; padding: 6px 14px; border-radius: 20px; font-size: 13px; margin-bottom: 15px; border: 1px solid #a7f3d0; }
            .footer { background: #fafafa; padding: 20px 25px; text-align: center; font-size: 12px; color: #6b7280; border-t: 1px solid #f3f4f6; }
            .btn { display: inline-block; background: #059669; color: #ffffff !important; font-weight: bold; text-decoration: none; padding: 12px 26px; border-radius: 10px; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>LGS Technologies</h1>
                <p>Official Credential Verification</p>
            </div>
            <div class="content">
                <div class="badge">Verified Certificate Issued</div>
                <h2 style="color: #111827; margin-top: 0;">Congratulations on Completing Your Internship, ' . $name . '! 🎓</h2>
                <p>You have successfully completed the <strong>' . $domain . '</strong> Internship Program at LGS Technologies!</p>
                <p>Your high-resolution, digitally signed <strong>Completion Certificate</strong> is attached to this email.</p>
                <p style="background: #f0fdf4; padding: 15px; border-left: 4px solid #10b981; border-radius: 6px;">
                    <strong>QR Code Verification:</strong><br>
                    Your certificate comes equipped with a tamper-proof QR code. Employers and recruiters can scan it anytime to verify your credentials live on our official verification portal.
                </p>
                <p>We are extremely proud of your hard work and dedication. We wish you immense success in your future career!</p>
                <br>
                <p>Best Regards,<br><strong>LGS Technologies Directors & Team</strong></p>
            </div>
            <div class="footer">
                &copy; ' . date("Y") . ' LGS Technologies. All rights reserved.<br>
                Chennai, Tamil Nadu, India
            </div>
        </div>
    </body>
    </html>';
}

// Build MIME Multipart Email if attachment is provided
$semi_rand = md5(time());
$mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";

$headers = "From: {$senderName} <{$fromEmail}>\r\n";
$headers .= "Reply-To: {$fromEmail}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed;\r\n boundary=\"{$mime_boundary}\"";

$message = "--{$mime_boundary}\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n";
$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$message .= $htmlContent . "\r\n\r\n";

if ($attachmentBase64) {
    $pdfData = base64_decode($attachmentBase64);
    $chunkedPdf = chunk_split(base64_encode($pdfData));

    $message .= "--{$mime_boundary}\r\n";
    $message .= "Content-Type: application/pdf; name=\"{$filename}\"\r\n";
    $message .= "Content-Description: {$filename}\r\n";
    $message .= "Content-Disposition: attachment;\r\n filename=\"{$filename}\"; size=" . strlen($pdfData) . ";\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $message .= $chunkedPdf . "\r\n\r\n";
}

$message .= "--{$mime_boundary}--";

// Execute native PHP mail()
$mailSuccess = mail($to, $subject, $message, $headers);

if ($mailSuccess) {
    echo json_encode(["success" => true, "message" => "Email sent successfully to {$to}"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "PHP mail() execution failed on server"]);
}
