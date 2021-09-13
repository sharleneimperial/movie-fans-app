'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Statement.belongsTo(models.Movie, {foreignKey:'movieId'});
      models.Statement.belongsTo(models.User, {foreignKey:'userId'});
    }
  };
  Statement.init({
    body: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Statement',
  });
  return Statement;
};