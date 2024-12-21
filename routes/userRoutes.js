const upload = require('../config/upload');
const { getAllUsers, getUserById, updateUser, updateProfileImage } = require('../controllers/userController');
const adminCheck = require('../middlewares/adminCheck');
const authCheck = require('../middlewares/authCheck');


const router = require('express').Router();


router.get('/', adminCheck, getAllUsers)

router.get('/getUserById', authCheck, getUserById)

router.put("/updateUser", authCheck, updateUser)

router.post('/updateProfilePicture', authCheck, upload.single("file"), updateProfileImage)


module.exports = router