const { createField, getAllFields } = require('../controllers/fieldController');



const router = require('express').Router();


router.post('/createField', createField)
router.get('/getFields', getAllFields)



module.exports = router