const {Sequelize, sequelize} = require('./db');

const Recipe = sequelize.define('recipe', {
 title: Sequelize.STRING,
  meal: Sequelize.STRING,
  ingredients: Sequelize.STRING,
  directions: Sequelize.STRING,
  cookTime: Sequelize.INTEGER, 
});

module.exports = { Recipe };
