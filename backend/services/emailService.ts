import nodemailer from 'nodemailer';

export async function sendOfferLetterEmail(toEmail: string, studentName: string, pdfPath: string) {
  let transporter;

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, 
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const mailOptions = {
    from: '"AIMTECH SOLUTIONS" <noreply@aimtech.in>',
    to: toEmail,
    subject: 'Your Internship Offer Letter - AIMTECH',
    text: `Dear ${studentName},\n\nCongratulations! We are pleased to offer you an internship at AIMTECH SOLUTIONS. Please find your offer letter attached.\n\nBest Regards,\nAIMTECH Team`,
    attachments: [
      {
        filename: 'Offer_Letter.pdf',
        path: pdfPath
      }
    ]
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent: %s', info.messageId);
  
  if (!process.env.SMTP_USER) {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return nodemailer.getTestMessageUrl(info);
  }
  
  return null;
}
