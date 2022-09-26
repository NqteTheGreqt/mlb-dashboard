const router = require('express').Router()
let User = require('../models/user.model')
const Hitters = require('../services/hitters')

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
  const email = req.body.email

  const newUser = new User({email})

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/get-hitters').get((req, res) => {
  //const email = req.query.email
  res.json.hitters = []
  User.findOne({ email: req.query.email })
    .then(user => res.json(user.hitters))
    .catch(err => res.status(400).json('Error: ' + err))

});

router.route('/add-hitter').post((req, res) => {
  User.findOne({ email: req.query.email })
    .then(user => {
      user.hitters.push(req.body.playerId)
      
      user.save()
        .then(() => res.json("Hitter added!"))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/delete-hitter').delete((req, res) => {
  User.findOne({ email: req.query.email })
    .then(user => {
      user.hitters = user.hitters.filter(hitter => 
        hitter != req.body.playerId)
      
      user.save()
        .then(() => res.json('Hitter deleted!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;