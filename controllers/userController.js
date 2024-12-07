const User = require("../models/User");


const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Server Error ::: User Get -- User Controller', error: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users: users });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error ::: Getting All Users -- User Controller', error: error.message });
    }
}



module.exports = {
    getUserById,
    getAllUsers
}