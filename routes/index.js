


const router = require('express').Router()
const authRoutes = require('./authRoutes')
const fieldRoutes = require('./fieldRoutes')
const blogPostRoutes = require('./blogPostRoutes')
const authCheck = require('../middlewares/authCheck')
const userRoutes = require('./userRoutes')


router.use('/auth', authRoutes)

router.use('/field', fieldRoutes)

router.use('/blog', authCheck,  blogPostRoutes)

router.use('/user', userRoutes)

module.exports = router