var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

 

  /* GET users listing. */
  router.get("/", userController.findAll);

  /* Create a new User*/
  router.post("/", userController.create);

  /* Retrieve all published User */
  router.get("/published", userController.findAllPublished);

  /* Retrieve a single User with id */
  router.get("/:id", userController.findOne);

  /* Update a User with id */
  router.put("/:id", userController.update);
 
  /* Delete a User with id */
  router.delete("/:id", userController.delete);

  /* Create a new User */
  router.delete("/", userController.deleteAll);
 

module.exports = router;
