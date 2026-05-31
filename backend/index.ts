import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth';
import internshipRoutes from './routes/internships';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('CodeTech API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
