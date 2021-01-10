const { Router } = require('express');
const userRouter = require('./user.js');
const authRouter = require('./auth.js');


const router = Router();
router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
