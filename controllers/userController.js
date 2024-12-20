const Field = require("../models/Field");
const User = require("../models/User");


const getUserById = async (req, res) => {
    

    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const field = await Field.findOne({ _id: user.field })


        res.status(200).json({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            year: user.year,
            field: field.field_name,
            sub_field: field.sub_field_name
        }); 
    } catch (error) {
        res.status(500).json({
            msg: "Server Error ::: User Get -- User Controller",
            error: error.message,
        });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users: users });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error ::: Getting All Users -- User Controller', error: error.message });
    }
}

const updateUser = async (req, res) => {
    
    try 
    {
        const id = req.user.id

        const updatedUser = await User.findByIdAndUpdate(id, {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            year: req.body.year,
            field_name: req.body.field,
            sub_field_name: req.body.sub_field
        });

        res.status(200).json(updatedUser);


    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error', error });
    }
}

const updateProfileImage = async (req, res) => {
    try {
        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Cloudinary URL for the uploaded image
        const imageUrl = req.file.path; 

        // Get the user ID from req.user (assuming it's added by authCheck middleware)
        const userId = req.user.id;

        // Update the user's profile picture in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: imageUrl }, // Store the Cloudinary URL in the profilePicture field
            { new: true } // Return the updated user data
        );

        // Send the response back with the updated user data and image URL
        res.status(200).json({
            message: "Profile picture updated successfully",
            profilePicture: imageUrl, // Return Cloudinary URL
            user: updatedUser, // Optionally return the updated user data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error while processing the image" });
    }
};




module.exports = {
    getUserById,
    getAllUsers,
    updateUser,
    updateProfileImage
}