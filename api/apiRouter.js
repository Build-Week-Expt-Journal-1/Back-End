const router = require('express').Router();
const userRouter = require('./routes/users/userRouter');
const placeRouter = require ('./routes/places/placeRouter')

router.use('/users',userRouter);
router.use('/places', placeRouter)

router.get('/' ,(req,res)=> {
    res.send('Expat Journal alive')
});

module.exports = router;