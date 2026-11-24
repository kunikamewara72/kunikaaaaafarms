require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/db');
const seedData = require('./utils/seed');

const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const ownerRoutes = require('./routes/ownerRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/owner', ownerRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', property: 'Grihum Farms Eco Stay & Water Spring' });
});

// Connect to DB and seed initial data
connectDB().then(async () => {
  await seedData();
  app.listen(PORT, () => {
    console.log(`🌿 Grihum Farms Backend running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect DB:', err);
});
