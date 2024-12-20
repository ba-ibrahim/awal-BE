const upload = require('../config/upload');
const { register, login, resetPassword } = require('../controllers/authController');


const router = require('express').Router();



router.post('/register', upload.single('profile_image'),  register)
router.post('/login', login)
router.put('/reset-password', resetPassword)



module.exports = router