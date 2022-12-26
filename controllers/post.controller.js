const Post = require("../models").Post;
const User = require("../models").User;
const { Op } = require("sequelize");
const { findOne, create } = require("./user.controller");

module.exports = {
  /* Get all posts */
  async findAll(req, res) {
    const email = req.query.email;
    var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

    Post.findAll({ include: User, where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Posts.",
        });
      });
  },
  /* Get all posts */
  async findOne(req, res) {
    const id = req.params.id;
    Post.findByPk(id,{ include: User } )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Posts.",
        });
      });
  },

  /* Save post in the database */
  async create(req, res) {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a Post
    const PostCollection = {
      title: req.body.title,
      body: req.body.body,
      userId: req.body.userId,
    };

    // Save Post in the database
    Post.create(PostCollection)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Post.",
        });
      });
  },

  /* Update a specific post */
  async update(req, res) {
    const id = req.params.id;   
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Update a Post
    const PostCollection = {
      title: req.body.title,
      body: req.body.body,
      userId: req.body.userId,
    };

    // Update Post in the database
    Post.update(PostCollection,{
        where: { id: id }
      })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Post was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Post with id=" + id
        });
      });
  },

  /* Delete a specific Post */
  async delete(req, res) {
  
    const id = req.params.id;
    const userId = req.params.userId;
    Post.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Post was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Post with id=" + id
        });
      });
               
    },

    /* Delete all a specific post */
    async deleteAll(req, res) {
      Post.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Posts were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Posts."
          });
        });
    },

     
};
