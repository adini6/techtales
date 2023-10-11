const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

//import models
const User = require('./user');
const BlogPost = require('./blogPost');
const Comment = require('./comment');

//// Set up associations
User.hasMany(BlogPost,{
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id'
});

BlogPost.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(BlogPost, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//export models and sequelize connection
module.exports = {User, BlogPost, Comment, sequelize};