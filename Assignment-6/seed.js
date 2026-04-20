const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const User   = require('./models/userModel');
const Doctor = require('./models/doctorModel');

const MONGO_URI = 'mongodb://127.0.0.1:27017/doctorDB';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Doctor.deleteMany({});
    console.log('Cleared existing Users and Doctors');

    const users = await User.create([
      {
        username : 'patient1',
        password : 'test123',
        name     : 'Rohan Sharma',
        email    : 'rohan@example.com',
        phone    : '9876543210',
        role     : 'patient'
      },
      {
        username : 'patient2',
        password : 'test123',
        name     : 'Priya Mehta',
        email    : 'priya@example.com',
        phone    : '9123456780',
        role     : 'patient'
      }
    ]);
    console.log(`Seeded ${users.length} users`);

    const doctors = await Doctor.create([
      {
        name           : 'Dr. Anita Desai',
        specialization : 'Cardiologist',
        experience     : 12,
        fee            : 800,
        availableSlots : ['9:00 AM', '10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'],
        image          : 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3RvcnxlbnwwfDB8MHx8fDA%3D'
      },
      {
        name           : 'Dr. Suresh Patel',
        specialization : 'Dermatologist',
        experience     : 8,
        fee            : 500,
        availableSlots : ['10:00 AM', '11:00 AM', '12:00 PM', '5:00 PM'],
        image          : 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yfGVufDB8MHwwfHx8MA%3D%3D'
      },
      {
        name           : 'Dr. Kavita Nair',
        specialization : 'Pediatrician',
        experience     : 15,
        fee            : 600,
        availableSlots : ['8:00 AM', '9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'],
        image          : 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9jdG9yfGVufDB8fDB8fHww'
      },
      {
        name           : 'Dr. Ramesh Iyer',
        specialization : 'Orthopedic Surgeon',
        experience     : 20,
        fee            : 1000,
        availableSlots : ['11:00 AM', '12:00 PM', '4:00 PM', '5:00 PM'],
        image          : 'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww'
      },
      {
        name           : 'Dr. Meena Joshi',
        specialization : 'General Physician',
        experience     : 5,
        fee            : 300,
        availableSlots : ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '4:30 PM', '6:00 PM'],
        image          : 'https://plus.unsplash.com/premium_photo-1681996428751-93e0294fe98d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGRvY3RvcnxlbnwwfDB8MHx8fDA%3D'
      }
    ]);

    console.log(`Seeded ${doctors.length} doctors`);

    console.log('\nSeeding complete!');
    console.log('Username : patient1');
    console.log('Password : test123\n');

  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();