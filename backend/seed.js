const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin'); // Ensure you have the Admin model

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedAdmin = async () => {
  try {
    const updatedAdmin = await Admin.findOneAndUpdate(
      { username: 'admin' },
      { password: 'password123' }, // Update details here
      { new: true, upsert: true } // upsert: create if it doesn't exist
    );
    console.log('Admin user updated successfully:', updatedAdmin);
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding admin:', err);
    mongoose.connection.close();
  }
};

seedAdmin();
