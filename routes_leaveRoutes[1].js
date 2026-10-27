constexpress=require('express');
constrouter=express.Router();
constUser=require('../models/User');

// Route to handle user registration
router.post('/register', async (req, res) => {
    const{ username, email, rollNumber, casualLeave=0, medicalLeave=0 } =req.body;

    try {
        // Check if the user already exists
        constexistingUser=awaitUser.findOne({ email });
        if (existingUser) {
            returnres.status(400).json({ message:'User already exists with this email' });
        }

        // Validate email format
        constemailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            returnres.status(400).json({ message:'Invalid email format' });
        }

        // Create a new user
        constnewUser=newUser({
            username,
            email,
            rollNumber,
            casualLeave,
            medicalLeave
        });

        awaitnewUser.save();
        res.status(201).json({
            message:'User created successfully',
            userId:newUser._id,
            username:newUser.username,
            rollNumber:newUser.rollNumber,
            casualLeave:newUser.casualLeave,
            medicalLeave:newUser.medicalLeave
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message:'Server error' });
    }
});

// Route to handle user login
router.post('/login', async (req, res) => {
    const{ email } =req.body;

    try {
        constuser=awaitUser.findOne({ email });
        if(!user) {
            returnres.status(404).json({ message:'User not found' });
        }

        // Return user details and leave balance
        res.json({
            message:'Login successful',
            userId:user._id,
            username:user.username,
            rollNumber:user.rollNumber,
            casualLeave:user.casualLeave,
            medicalLeave:user.medicalLeave
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message:'Server error', error:error.message });
    }
});

// Route to get leave balance by user ID
router.get('/leave-balance/:id', async (req, res) => {
    try {
        constuser=awaitUser.findById(req.params.id);
        if(!user) {
            returnres.status(404).json({ message:'User not found' });
        }

        res.json({
            casualLeave:user.casualLeave,
            medicalLeave:user.medicalLeave
        });
    } catch (error) {
        console.error('Error fetching leave balance:', error);
        res.status(500).json({ message:'Server error' });
    }
});

// Route to apply for leave (ADD leave days instead of reducing them)
router.post('/apply-leave/:id', async (req, res) => {
    const{ type, days } =req.body;

    try {
        constuser=awaitUser.findById(req.params.id);
        if(!user) {
            returnres.status(404).json({ message:'User not found' });
        }

        // Ensure days is a number
        constleaveDays=parseInt(days);
        if (isNaN(leaveDays) ||leaveDays<=0) {
            returnres.status(400).json({ message:'Invalid number of days' });
        }

        // Add leave days instead of reducing them
        if (type==='casual') {
            user.casualLeave+=leaveDays;
        } elseif (type==='medical') {
            user.medicalLeave+=leaveDays;
        } else {
            returnres.status(400).json({ message:'Invalid leave type' });
        }

        awaituser.save();
        res.json({
            message:'Leave added successfully',
            casualLeave:user.casualLeave,
            medicalLeave:user.medicalLeave
        });
    } catch (error) {
        console.error('Error adding leave:', error);
        res.status(500).json({ message:'Server error' });
    }
});

module.exports=router;
