const { axios } = require("axios");
const Meeting = require("../models/Meeting");

const createMeeting = async (req, res) => {
  const { title, description, date, time } = req.body;

  if (!title || !description || !date || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new meeting document
    const newMeeting = new Meeting({
      title,
      description,
      meetTime: time, 
      meetDate: date,
    });

    // Save the meeting to the database
    await newMeeting.save();

    return res.status(201).json({
      message: "Meeting created successfully",
      meeting: newMeeting,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};



const getAllMeetings = async (req, res) => {
    try {
      const meetings = await Meeting.find();
      return res.status(200).json(meetings);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  };

  

  const getMeetingById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const meeting = await Meeting.findById(id);
  
      if (!meeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }
  
      return res.status(200).json(meeting);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  };

  

  const updateMeeting = async (req, res) => {
    const { id } = req.params;
    const { title, description, meetingTime } = req.body;
  
    try {
      const updatedMeeting = await Meeting.findByIdAndUpdate(
        id,
        { title, description, meetingTime },
        { new: true } // Return the updated meeting
      );
  
      if (!updatedMeeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }
  
      return res.status(200).json({
        message: "Meeting updated successfully",
        meeting: updatedMeeting,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  };

  

  const deleteMeeting = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedMeeting = await Meeting.findByIdAndDelete(id);
  
      if (!deletedMeeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }
  
      return res.status(200).json({
        message: "Meeting deleted successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  };
  


module.exports ={
    createMeeting,
    getAllMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting
}