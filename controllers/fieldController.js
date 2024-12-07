const Field = require("../models/Field");


const createField = async (req, res) => {
    const { field_name, sub_field_name, years } = req.body;
    try {
        // Check if field already exists
        const existingField = await Field.findOne({ sub_field_name });
        if (existingField) {
            return res.status(400).json({ msg: 'Field already exists' });
        }
        
        // Generate years array
        const yearsArray = Array.from({ length: years }, (_, i) => i + 1);

        // Create new field
        const newField = await Field.create({
            field_name,
            sub_field_name,
            years: yearsArray
        });

        res.json({ msg: 'Field created successfully', newField });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error ::: Field Creation -- field Controller', error: error.message });
    }
};


const getAllFields = async (req, res) => {
    
    try {
        const fields = await Field.find();
        res.status(200).json({ fields: fields });
        
    } catch (error) {
        res.status(500).json({ msg: 'Server Error ::: Getting All Fields -- field Controller', error: error.message });
        console.log({
            msg: error.message
        });
        
    }
}



module.exports = {
    createField,
    getAllFields
};