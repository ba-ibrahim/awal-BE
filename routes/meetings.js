const express = require("express");
const router = express.Router();

const {
    createMeeting,
    getAllMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting,
} = require("../controllers/meetingController");

/**
 * @swagger
 * /api/v1/:
 *   post:
 *     summary: Create a new meeting
 *     description: This endpoint allows a user to create a new meeting.
 *     parameters:
 *       - in: body
 *         name: meeting
 *         required: true
 *         description: Meeting details to create a new meeting.
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "Team Meeting"
 *             date:
 *               type: string
 *               format: date
 *               example: "2024-12-25"
 *             time:
 *               type: string
 *               example: "10:00 AM"
 *             description:
 *               type: string
 *               example: "Meeting to discuss the project progress."
 *     responses:
 *       201:
 *         description: Meeting successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Meeting created successfully"
 *                 meeting:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Team Meeting"
 *                     date:
 *                       type: string
 *                       example: "2024-12-25"
 *                     time:
 *                       type: string
 *                       example: "10:00 AM"
 *                     description:
 *                       type: string
 *                       example: "Meeting to discuss the project progress."
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.post("/", createMeeting);

/**
 * @swagger
 * /api/v1/:
 *   get:
 *     summary: Get all meetings
 *     description: This endpoint retrieves a list of all meetings.
 *     responses:
 *       200:
 *         description: List of meetings successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "Team Meeting"
 *                   date:
 *                     type: string
 *                     example: "2024-12-25"
 *                   time:
 *                     type: string
 *                     example: "10:00 AM"
 *                   description:
 *                     type: string
 *                     example: "Meeting to discuss the project progress."
 *       500:
 *         description: Server error
 */
router.get("/", getAllMeetings);

/**
 * @swagger
 * /api/v1/{id}:
 *   get:
 *     summary: Get a specific meeting by ID
 *     description: This endpoint retrieves a specific meeting by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the meeting to retrieve.
 *     responses:
 *       200:
 *         description: Meeting successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "Team Meeting"
 *                 date:
 *                   type: string
 *                   example: "2024-12-25"
 *                 time:
 *                   type: string
 *                   example: "10:00 AM"
 *                 description:
 *                   type: string
 *                   example: "Meeting to discuss the project progress."
 *       404:
 *         description: Meeting not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getMeetingById);

/**
 * @swagger
 * /api/v1/{id}:
 *   put:
 *     summary: Update a meeting by ID
 *     description: This endpoint allows a user to update a meeting by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the meeting to update.
 *       - in: body
 *         name: meeting
 *         required: true
 *         description: Updated meeting details.
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "Updated Team Meeting"
 *             date:
 *               type: string
 *               format: date
 *               example: "2024-12-30"
 *             time:
 *               type: string
 *               example: "02:00 PM"
 *             description:
 *               type: string
 *               example: "Updated agenda for the project discussion."
 *     responses:
 *       200:
 *         description: Meeting successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Meeting updated successfully"
 *                 meeting:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Updated Team Meeting"
 *                     date:
 *                       type: string
 *                       example: "2024-12-30"
 *                     time:
 *                       type: string
 *                       example: "02:00 PM"
 *                     description:
 *                       type: string
 *                       example: "Updated agenda for the project discussion."
 *       404:
 *         description: Meeting not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateMeeting);

/**
 * @swagger
 * /api/v1/{id}:
 *   delete:
 *     summary: Delete a meeting by ID
 *     description: This endpoint allows a user to delete a meeting by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the meeting to delete.
 *     responses:
 *       200:
 *         description: Meeting successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Meeting deleted successfully"
 *       404:
 *         description: Meeting not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteMeeting);

module.exports = router;
