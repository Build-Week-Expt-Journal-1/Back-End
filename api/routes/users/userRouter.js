const Users = require('./userModel');
const bcrypt = require('bcrypt');
const secrets = require('../../../config/secrets')
const jwt = require("jsonwebtoken");

const router = require("express").Router();


 

router.post('/register',(req,res)=> {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash;

    Users.addUser(user)
    .then(saved => {
        res.status(201).json(saved)
    })
    .catch(err => {
        res.status(500).json(err)
    })

})

router.post("/login", (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = genToken(user);
  
          res.status(200).json({
            message: `Welcome ${user.username, user.user_id}!`,
            token: token
          });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({message: error});
      });
  });
  
  function genToken(user) {
    const payload = {
      userid: user.id,
      username: user.username
    };
    const secret = secrets.jwtSecret;
    const options = { expiresIn: "1h" };
  
    const token = jwt.sign(payload, secrets.jwtSecret, options);
  
    return token;
  }
  
  module.exports = router;