const db = require('./placeModel');
const Users = require('../users/userModel');

const auth = require('../../auth-middleware');

const router = require("express").Router();

router.get('/',auth, (req,res)=> {
    const id = req.header.user_id;

    db.getAllPlaces( )
    .then(place=> {
        res.status(200).json(place)
    })
    .catch(err=> {
        res.status(500).json({message: 'error retrieving the places'})
    })
})

router.post('/', (req,res)=> {
    const creds = req.body;

    db.addPlace(creds)

    .then(place=> {
        res.status(201).json(place[0])
    })
    .catch(err=> {
        res.status(500).json({message: 'Error adding the place to database'})
    })

});

// router.get('/:id', (req,res)=> {
//     const id = req.params.id;
//   const user_id = req.headers.user_id;

//   db.getPlace(id)
//   .then(place => {
//       place
//       ? res.status(200).json(place)
//       : res.status(404).json({message: 'Cannot find that place.'})
//   })
//   .catch(err=> {
//       res.status(500).json({message: "Error retreiving the Place."})
//   })
// })

router.get('/:id', (req,res)=> {
        const id = req.params.id;

    db.findById(id)
    .then(place=> {
        if (place){
        res.status(200).json(place)
    }else{
        res.status(404).json({message: "could not find the place."})
    }
    })
    .catch(err=> ({message: 'Error finding the Place.'}))
})




module.exports = router;