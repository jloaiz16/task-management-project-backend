module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('task', {
      title: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      done: { type: Sequelize.BOOLEAN }
    });
  
    return Task;
  };