const User = require('../models/userModel');
const { Booking } = require('../models/packageModel');

exports.createBooking = async (req, res) => {
    try {
        // STEP 1: Check if user already exists
        let user = await User.findOne({ email: req.body.email });

        // STEP 2: If not, create new user
        if (!user) {
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: "default123" // temporary
            });
        }

        const savedUser = await newUser.save();

        // 2. Create booking using user ID
        const booking = new Booking({
            user: savedUser._id,
            package: req.body.package,
            numberOfPeople: req.body.numberOfPeople,
            totalAmount: req.body.totalAmount,
            travelDate: req.body.travelDate
        });

        const savedBooking = await booking.save();

        res.status(201).json(savedBooking);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all bookings with user + package details
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user')
            .populate('package');

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};