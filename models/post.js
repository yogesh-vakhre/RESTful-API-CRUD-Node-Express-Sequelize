'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: "userId"
      });     
    }
  }  
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    userId: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
    }
    
  }, {
    sequelize,
    modelName: 'Post',
  });
 

  return Post;
};