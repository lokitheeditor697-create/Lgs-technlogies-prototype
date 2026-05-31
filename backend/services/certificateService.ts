import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';

export async function generateCertificate(
  studentName: string,
  course: string,
  college: string,
  domain: string,
  startDate: string,
  endDate: string,
  certificateId: string
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // Portrait A4 size: [595.28, 841.89]
      const doc = new PDFDocument({
        size: 'A4',
        layout: 'portrait',
        margin: 0
      });

      const fileName = `certificate_${certificateId}.pdf`;
      const publicDir = path.join(__dirname, '..', 'public', 'certificates');
      
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }

      const filePath = path.join(publicDir, fileName);
      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      const templatePath = path.join(__dirname, '..', 'public', 'certificate-portrait.png');
      if (fs.existsSync(templatePath)) {
        doc.image(templatePath, 0, 0, { width: 595.28, height: 841.89 });
        
        // --- Cover Placeholders ---
        // (No placeholders to cover anymore! The new template is super clean.)

        // --- Write Dynamic Text ---
        const formattedStart = new Date(startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
        const formattedEnd = new Date(endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
        const issueDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

        doc.font('Helvetica').fontSize(14).fillColor('#333333'); // Increased font size to 14
        
        // Print date at the top right, moved slightly up and right
        doc.text(`Date: ${issueDate}`, 435, 241);
        
        const startX = 60;
        const textWidth = 475; // 595.28 - 120
        
        // Paragraph 1
        // Removed 'align: justify' to prevent large gaps. Added spaces inside the strings instead of relying on continued auto-spacing.
        doc.text('This is to certify that Mr./Ms. ', startX, 390, { continued: true, width: textWidth, lineGap: 8, align: 'left' })
           .font('Helvetica-Bold').text(`${studentName} `, { continued: true })
           .font('Helvetica').text('pursuing ', { continued: true })
           .font('Helvetica-Bold').text(`${course} `, { continued: true })
           .font('Helvetica').text('at ', { continued: true })
           .font('Helvetica-Bold').text(`${college}, `, { continued: true })
           .font('Helvetica').text('has successfully completed the internship training at ', { continued: true })
           .font('Helvetica-Bold').text('LGS Technologies ', { continued: true })
           .font('Helvetica').text('during the period from ', { continued: true })
           .font('Helvetica-Bold').text(`${formattedStart} `, { continued: true })
           .font('Helvetica').text('to ', { continued: true })
           .font('Helvetica-Bold').text(`${formattedEnd}.`, { continued: false });
           
        doc.moveDown(1.5);
        
        // Paragraph 2
        doc.font('Helvetica').text('During the internship period, the student worked on various tasks and projects related to ', { continued: true, width: textWidth, lineGap: 8, align: 'left' })
           .font('Helvetica-Bold').text(`${domain} `, { continued: true })
           .font('Helvetica').text('and demonstrated sincere effort, dedication, and enthusiasm towards learning and professional development.', { continued: false });
        
        doc.moveDown(1.5);
        
        // Paragraph 3
        doc.text('We found his/her performance to be satisfactory and appreciate the hard work, discipline, and commitment shown throughout the internship.', { width: textWidth, lineGap: 8, align: 'left' });
        
        doc.moveDown(1.5);
        
        // Paragraph 4
        doc.text('We wish him/her all the best for future endeavors.', { width: textWidth, lineGap: 8, align: 'left' });

        // Place - print directly on the line
        doc.text('Chennai', 95, 700);

      } else {
        // Fallback drawing if the template isn't uploaded
        doc.rect(20, 20, 555.28, 801.89).lineWidth(5).stroke('#1e3a8a');
        doc.fontSize(30).fillColor('#1e3a8a').text('INTERNSHIP CERTIFICATE', 0, 100, { align: 'center' });
        doc.fontSize(16).fillColor('#4b5563').text('This certifies that', 0, 180, { align: 'center' });
        doc.fontSize(24).fillColor('#111827').text(studentName.toUpperCase(), 0, 220, { align: 'center' });
      }

      // Generate QR Code linking to verification portal
      const verificationUrl = `http://localhost:3000/verify/${certificateId}`;
      const qrImage = await QRCode.toDataURL(verificationUrl, { color: { dark: '#1e3a8a', light: '#ffffff' }, margin: 1 });
      
      // Draw QR Code below the 'Place' line at the bottom left
      doc.image(qrImage, 95, 720, { width: 60 });
      doc.font('Helvetica-Bold').fontSize(8).fillColor('#666666').text(`Scan to Verify`, 95, 785, { width: 60, align: 'center' });
      doc.font('Helvetica').fontSize(7).fillColor('#999999').text(`ID: ${certificateId}`, 85, 795, { width: 80, align: 'center' });

      doc.end();

      writeStream.on('finish', () => {
        resolve(`/certificates/${fileName}`);
      });
      
      writeStream.on('error', reject);

    } catch (error) {
      reject(error);
    }
  });
}
