import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateOfferLetter } from '../services/pdfService';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { authMiddleware } from '../middleware/auth';

const razorpay = new Razorpay({
  key_id: 'rzp_test_SvsbOeBc2Na56d',
  key_secret: 'bdn9Vprn4qah97SkRnbzQ6EH'
});

const getPrice = (domain: string, duration: string) => {
  const techDomains = [
    'Full Stack Development', 'Python Development', 'AI & ML Development', 
    'Data Science', 'Data Analytics', 'Cyber Security', 'Web Development', 
    'Cloud Computing', 'UI/UX Designing'
  ];
  
  const isTech = techDomains.includes(domain);
  let basePrice = 99; // Default fallback
  
  if (duration.includes('4 Weeks') || duration.includes('1 Month')) basePrice = 99;
  else if (duration.includes('8 Weeks') || duration.includes('2 Months')) basePrice = 150;
  else if (duration.includes('12 Weeks') || duration.includes('3 Months')) basePrice = 199;
  else if (duration.includes('24 Weeks') || duration.includes('6 Months')) basePrice = 299;
  
  if (!isTech && basePrice > 0) {
    basePrice -= 50;
  }
  
  return basePrice;
};

const router = Router();
const prisma = new PrismaClient();

// Get all internships
router.get('/', async (req, res) => {
  try {
    const internships = await prisma.internship.findMany();
    res.json(internships);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
});

// Get registrations for a specific user
router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const registrations = await prisma.registration.findMany({
      where: { userId },
      include: { internship: true, certificate: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(registrations);
  } catch (error) {
    console.error('Fetch user registrations error:', error);
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

// Enroll in an internship
router.post('/enroll', authMiddleware, async (req, res) => {
  try {
    const { userId, studentName, studentEmail, course, college, domain, duration, startDate, endDate } = req.body;

    // Find or create the internship based on domain AND duration
    let internship = await prisma.internship.findFirst({
      where: { domain: domain, duration: duration || "4 Weeks" }
    });

    if (!internship) {
      const price = getPrice(domain, duration || "4 Weeks");
      const techDomains = [
        'Full Stack Development', 'Python Development', 'AI & ML Development', 
        'Data Science', 'Data Analytics', 'Cyber Security', 'Web Development', 
        'Cloud Computing', 'UI/UX Designing'
      ];
      
      internship = await prisma.internship.create({
        data: {
          title: `${domain} Internship`,
          domain: domain,
          duration: duration || "4 Weeks",
          price: price,
          type: techDomains.includes(domain) ? "TECH" : "NON_TECH"
        }
      });
    }

    const registration = await prisma.registration.create({
      data: {
        userId,
        internshipId: internship.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: "PENDING",
      }
    });

    const certificateId = `LGS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    await prisma.certificate.create({
      data: {
        certificateId,
        registrationId: registration.id,
        pdfUrl: "",
        status: "PENDING"
      }
    });

    // 1. Generate PDF Offer Letter
    const offerLetterUrl = await generateOfferLetter(studentName, course, college, startDate, endDate, domain, certificateId);

    // Save offerLetterUrl to registration
    const updatedRegistration = await prisma.registration.update({
      where: { id: registration.id },
      data: { offerLetterUrl }
    });

    res.json({ 
      message: 'Enrolled successfully, offer letter generated', 
      registration: updatedRegistration 
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ error: 'Enrollment failed' });
  }
});

// Mock Complete Modules (Can still be used as fallback)
router.post('/mock-complete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await prisma.registration.update({
      where: { id },
      data: { status: 'COMPLETED' }
    });
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete modules' });
  }
});

// Get single registration
router.get('/registration/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await prisma.registration.findUnique({
      where: { id },
      include: { internship: true, user: true }
    });
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

// Update progress
router.post('/progress/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { progressStr } = req.body;
    
    const registration = await prisma.registration.update({
      where: { id },
      data: { progress: progressStr }
    });
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Submit Task (Drive Link)
router.post('/task/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { driveLink } = req.body;
    
    const registration = await prisma.registration.update({
      where: { id },
      data: { driveLink }
    });
    res.json(registration);
  } catch (error) {
    console.error('Failed to submit task:', error);
    res.status(500).json({ error: 'Failed to submit task' });
  }
});

import { generateCertificate } from '../services/certificateService';

// Razorpay Create Order
router.post('/create-order/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await prisma.registration.findUnique({
      where: { id },
      include: { internship: true }
    });

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    const price = registration.internship.price || getPrice(registration.internship.domain, registration.internship.duration);
    const amountInPaise = price * 100;

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: registration.id,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

// Razorpay Verify Payment & Generate Certificate
router.post('/verify-payment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', 'bdn9Vprn4qah97SkRnbzQ6EH')
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }
    
    // 1. Mark as PAID
    const registration = await prisma.registration.update({
      where: { id },
      data: { paymentStatus: 'PAID', paymentId: razorpay_payment_id },
      include: { user: true, internship: true }
    });

    // 2. Find or Generate Certificate
    let certificate = await prisma.certificate.findUnique({
      where: { registrationId: registration.id }
    });
    
    const certificateId = certificate ? certificate.certificateId : `LGS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    const pdfUrl = await generateCertificate(
      registration.user.name,
      'Engineering',
      registration.user.college || 'College',
      registration.internship.domain,
      registration.startDate.toISOString(),
      registration.endDate.toISOString(),
      certificateId
    );

    // 3. Save Certificate in DB
    if (certificate) {
      certificate = await prisma.certificate.update({
        where: { id: certificate.id },
        data: { pdfUrl, status: "ISSUED" }
      });
    } else {
      certificate = await prisma.certificate.create({
        data: {
          certificateId,
          registrationId: registration.id,
          pdfUrl,
          status: "ISSUED"
        }
      });
    }

    res.json({ message: "Payment verified and Certificate Generated", certificate });
  } catch (error) {
    console.error('Payment verify error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Verify Certificate Public Route
router.get('/verify-certificate/:certificateId', async (req, res) => {
  try {
    const { certificateId } = req.params;
    const certificate = await prisma.certificate.findUnique({
      where: { certificateId },
      include: {
        registration: {
          include: {
            user: true,
            internship: true
          }
        }
      }
    });

    if (!certificate) {
      return res.status(404).json({ valid: false, error: "Certificate not found." });
    }
    
    if (certificate.status === "REVOKED") {
      return res.status(400).json({ valid: false, error: "This certificate has been revoked." });
    }

    res.json({ valid: true, certificate });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

export default router;
