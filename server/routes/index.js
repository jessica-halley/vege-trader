var express = require('express')
var router = express.Router()

var db = require('../db')

router.get('/', function (req, res) {
  db.getUsers(req.app.get('connection'))
    .then(function (users) {
      res.render('index', { users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/react', (req, res) => {
  db.getUsers(req.app.get('connection'))
  .then(function (users) {
    res.render('react', {users: JSON.stringify(users)})
  })
  .catch(function (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
})

router.post('/react', (req, res) => {
  db.addUser(req.body, req.app.get('connection'))
  .then(function (response) {
    res.status(201).send({user_id: response[0]})
  })
  .catch(function (err){
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
})

module.exports = router
