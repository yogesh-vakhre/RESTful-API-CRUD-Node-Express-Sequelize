var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth.controller')

  /* Create a new User*/
  router.post("/register", authController.register);

  /* Login User*/
  router.post("/login", authController.login);

module.exports = router;