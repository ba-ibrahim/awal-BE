const express = require("express");
const router = express.Router();

const {
    createMeeting,
    getAllMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting,
} = require("../controllers/meetingController")
// Create a new meeting
router.post("/", createMeeting);

// Get all meetings
router.get("/", getAllMeetings);

// Get a specific meeting by ID
router.get("/:id", getMeetingById);

// Update a meeting by ID
router.put("/:id", updateMeeting);

// Delete a meeting by ID
router.delete("/:id", deleteMeeting);

module.exports = router;
