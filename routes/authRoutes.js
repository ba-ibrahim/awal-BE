const upload = require('../config/upload');
const { register, login, resetPassword } = require('../controllers/authController');

const router = require('express').Router();

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a user to register by providing profile image and required information.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: profile_image
 *         type: file
 *         required: true
 *         description: The user's profile image to upload.
 *       - in: formData
 *         name: firstName
 *         type: string
 *         required: true
 *         description: The user's first name.
 *       - in: formData
 *         name: lastName
 *         type: string
 *         required: true
 *         description: The user's last name.
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: The user's email address.
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: The user's password.
 *     responses:
 *       200:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *       400:
 *         description: Bad request, validation errors, or missing fields
 *       500:
 *         description: Server error
 */
router.post('/register', upload.single('profile_image'), register);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login a user
 *     description: This endpoint allows a user to log in using email and password.
 *     parameters:
 *       - in: body
 *         name: email
 *         type: string
 *         required: true
 *         description: The user's email address.
 *       - in: body
 *         name: password
 *         type: string
 *         required: true
 *         description: The user's password.
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "your-jwt-token"
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', login);

/**
 * @swagger
 * /api/v1/reset-password:
 *   put:
 *     summary: Reset user password
 *     description: This endpoint allows a user to reset their password by providing a new one.
 *     parameters:
 *       - in: body
 *         name: email
 *         type: string
 *         required: true
 *         description: The email address of the user requesting the password reset.
 *       - in: body
 *         name: newPassword
 *         type: string
 *         required: true
 *         description: The new password to be set.
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully"
 *       400:
 *         description: Invalid request or missing fields
 *       500:
 *         description: Server error
 */
router.put('/reset-password', resetPassword);

module.exports = router;
