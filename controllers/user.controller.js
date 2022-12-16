const User = require("../models").User
const { Op } = require("sequelize");

module.exports = {
  
  /* Get all users */
  async findAll(req, res) {
    const email = req.query.email;
    var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
  
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
  },
  /* Get a specific user */
  async findOne(req, res) {
    const id = req.params.id;

    User.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  },
  /* Create a new user */
  async create(req, res) {
     // Validate request
    if (!req.body.email) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

  // Create a User
  const UserCollection = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    published: req.body.published,
  };
 

  // Save User in the database
  User.create(UserCollection)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
  },
  /* Update a specific user */
  async update(req, res) {
    
    const id = req.params.id;

    User.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      published: req.body.published,
    },{
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
     
  },
  /* Delete a specific user */
  async delete(req, res) {
  
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
             
  },
  /* Delete all a specific user */
  async deleteAll(req, res) {
    User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Users were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Users."
        });
      });
  },
  /* Published all users */
  async findAllPublished (req, res) {
    User.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    });
  }
}