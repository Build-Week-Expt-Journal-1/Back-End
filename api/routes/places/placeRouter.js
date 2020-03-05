const db = require("./placeModel");
const Users = require("../users/userModel");

const auth = require("../../auth-middleware");

const router = require("express").Router();

//This one gets ALL the Places.
router.get("/all",   (req, res) => {
  const id = req.header.user_id;
  // const { id } = req.params;

  db.getAllPlaces()
    .then(place => {
      res.status(200).json(place);
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving the places" });
    });
});

// This One gets by the userID.

router.get("/", auth, (req, res) => {
  const Uid = req.headers.user_id;
  const id = req.params.id;

  db.findPlaces(Uid)
    .then(place => {
      res.status(200).json(place);
    })

    .catch(err => {
      res.status(500).json({ message: "Error getting the Place." });
    });
});

router.post("/", (req, res) => {
  const creds = req.body;

  db.addPlace(creds)

    .then(place => {
      res.status(201).json(place[0]);
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding the place to database" });
    });
});

 

router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(place => {
      if (place) {
        res.status(200).json(place);
      } else {
        res.status(404).json({ message: "could not find the place." });
      }
    })
    .catch(err => ({ message: "Error finding the Place." }));
});

router.post("/:id/stories", (req, res) => {
  const storyData = req.body;
  const { id } = req.params;
  // const Uid = req.headers.user_id;

  //   const { placeId } = req.place_id;

  db.findById(id)
    .then(place => {
      if (place) {
        db.addStory(storyData, id ).then(story => {
          res.status(201).json(story);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find the place with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding the Story." });
    });
});

router.get("/:id/stories", (req, res) => {
  const { id } = req.params;
  console.log("THIS ONE??", req.headers.place_id, req.params);
  db.getStories(id)
    .then(stories => {
      if (stories.length) {
        res.json(stories);
      } else {
        res
          .status(404)
          .json({ message: "Could not find stories for given place." });
      }
    })
    .catch(err => {
      res.status(500).json("Error getting the Stories, Sucka");
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.findById(id)
    .then(place => {
      if (place) {
        db.update(changes, id).then(update => {
          res.json(update);
        });
      } else {
        res.status(404).json({ message: "Could not find" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log("DELETE", id);
  db.remove(id)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find place with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

router.get('/:id/stories/:id',(req,res)=> {
  const {id}= req.params;
  db.findStoryById(id)
  .then(story=> {
    if(story){
      res.status(200).json(story)
    }else{
      res.status(404).json({message: 'Could not find story with that ID'})
    }
  })
  .catch(err => {
    res.status(500).json({message: 'error retreiving the story.'})
  })
})
 
router.put("/:id/stories/:id", (req, res) => {
  const { id } = req.params;
  const info = req.body;
  const user_id = req.headers.user_id;
   console.log('ID TO PUT', id)
  db.findStoryById(id)
    .then(story => {
      if (story) {
        db.updateStory(info,id).then(update => {
          res.status(200).json(update);
        });
      } else {
        res.status(404).json({ message: "Could not find" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not update story." });
    });
});

router.delete("/:id/stories/:id", (req, res) => {
  const { id } = req.params;
   db.removeStory(id)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find place with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete story" });
    });
});

module.exports = router;
