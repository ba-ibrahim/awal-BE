

const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { f_name, l_name, email, password } = req.body

    try
    {
        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create a new user
        const newUser = User.create({ f_name, l_name, email, hashedPassword });
        
        // Send back a success message and the user object
        res.status(200).json({ msg: 'User registered successfully', user: newUser });

    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}



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
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid password' });
        }
        
        // Create and send a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ msg: 'User logged in successfully', token });
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}


const resetPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try
    {
        // Get the user from the JWT payload
        // fixme: debug: this is not working because of the JWT token note: 
        const user = jwt.verify(req.token, process.env.JWT_SECRET);
        
        // Check if old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.hashedPassword);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid old password' });
        }
        
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        // Update the user's password
        await User.findByIdAndUpdate(user.id, { hashedPassword });
        
        res.status(200).json({ msg: 'Password reset successfully' });
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send('Server error');
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


module.exports = {
    register,
    login,
    resetPassword,
    forgotPassword,
};
