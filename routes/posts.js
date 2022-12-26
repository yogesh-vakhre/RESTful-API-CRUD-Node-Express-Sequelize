var express = require('express');
var router = express.Router();
const postController = require('../controllers/post.controller')

  /* GET Post listing. */
  router.get("/", postController.findAll);

  /* Create a new Post*/
  router.post("/", postController.create);

  /* Retrieve a single post with id */
  router.get("/:id", postController.findOne);

  /* Update a post with id */
  router.put("/:id", postController.update);
 
  /* Delete a post with id */
  router.delete("/:id", postController.delete);

  /* Delete all post */
  router.delete("/", postController.deleteAll);
 

module.exports = router;
