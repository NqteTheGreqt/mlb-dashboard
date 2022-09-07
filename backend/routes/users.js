const router = require('express').Router()
let User = require('../models/user.model')

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
  const username = req.body.username

  const newUser = new User({username})

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add-hitter/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.hitters.push(req.body.playerId)
      
      user.save()
        .then(() => res.json('Hitter added!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/delete-hitter/:id').delete((req, res) => {
  User.findById(req.params.id)
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