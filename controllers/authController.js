

const User = require('../models/User');
const Field = require('../models/Field');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { first_name, last_name, email, password, year, field_id } = req.body;
    
    // If an image is uploaded, the file info will be available in `req.file`
    const profileImageUrl = req.file ? req.file.path : ''; // If no file uploaded, use an empty string

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Validate field ID
        const isFieldValid = await Field.exists({ _id: field_id });
        if (!isFieldValid) {
            return res.status(400).json({ message: "Invalid field ID" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            year,
            field: field_id,
            profile_image: profileImageUrl,
        });

        // Respond with success
        res.status(200).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).json({ message: error.message });
    }
};




const login = async (req, res) => {
    const { email, password } = req.body;

    try 
    {
        // Check if user exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid password' });
        }
        
        // Create and send a JWT token
        const token = await jwt.sign({ id: user._id, isAdmin: user.is_admin, isSupderStudent: user.is_super_student }, process.env.JWT_SECRET);
        res.status(200).json({ msg: 'User logged in successfully', token: token });
    }
    catch (error)
    {
        res.status(500).send(error);
    }
}


const resetPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.user

    try
    {
        const user = await User.findById({ _id: userId});
        
        // Check if old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid old password' });
        }
        
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        // Update the user's password
        await User.findByIdAndUpdate(user.id, { password: hashedPassword });
        
        res.status(200).json({ msg: 'Password reset successfully' });
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).json({msg: 'Server error', error});
    }
}



const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try
    {
        // send OTP email

        // Generate a random OTP
        const otp = Math.floor(1000 + Math.random() * 9000);
        
        // Send the OTP to the user's email
        // fixme: debug: this is not working because of the email sending note:

    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

const verifyOtp = async (req, res) => {
    const { otp } = req.body;
    try
    {
        
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}


module.exports = {
    register,
    login,
    resetPassword,
    forgotPassword,
};

