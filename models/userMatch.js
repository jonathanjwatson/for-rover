module.exports = function (sequelize, DataTypes) {
  const UserMatch = sequelize.define("UserMatch", {
    userOneStatus: DataTypes.STRING,
    userTwoStatus: DataTypes.STRING,
  });

  UserMatch.associate = function (models) {
    UserMatch.belongsTo(models.User, { as: "UserOne" });
    UserMatch.belongsTo(models.User, { as: "UserTwo" });
  };

  return UserMatch;
};
