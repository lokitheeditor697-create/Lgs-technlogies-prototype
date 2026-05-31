import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple'; // Will use jsonwebtoken in real app
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, college, department, year, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        college,
        password: hashedPassword,
        // In real scenario, store department and year in a profile or user model
      },
    });

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Since jwt-simple was imported just for typing example, we'll assume jsonwebtoken
    // const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    const token = 'mock-jwt-token-' + user.id;

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, college, phone, currentPassword, newPassword } = req.body;

    const dataToUpdate: any = {};
    if (name) dataToUpdate.name = name;
    if (college) dataToUpdate.college = college;
    if (phone) dataToUpdate.phone = phone;
    
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required to set a new password' });
      }
      
      // Verify current password
      const currentUser = await prisma.user.findUnique({ where: { id } });
      if (!currentUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const isMatch = await bcrypt.compare(currentPassword, currentUser.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Incorrect current password' });
      }

      dataToUpdate.password = await bcrypt.hash(newPassword, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        college: user.college,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
