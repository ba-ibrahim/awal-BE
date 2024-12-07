const { getAllUsers } = require('../controllers/userController');
const adminCheck = require('../middlewares/adminCheck');


const router = require('express').Router();


router.get('/', adminCheck, getAllUsers)


module.exports = router