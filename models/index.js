const { Sequelize } = require('sequelize');
const UserModel = require('./users');
const TaskModel = require('./task');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const User = UserModel(sequelize);
const Task = TaskModel(sequelize);

// Associations between models
User.hasMany(Task);
Task.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Task
};
