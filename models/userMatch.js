module.exports = function (sequelize, DataTypes) {
  const UserMatch = sequelize.define(
    "UserMatch",
    {
      userOneStatus: DataTypes.STRING,
      userTwoStatus: DataTypes.STRING,
      UserOneId: DataTypes.INTEGER,
      UserTwoId: DataTypes.INTEGER,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["UserOneId", "UserTwoId"],
        },
      ],
    }
  );

  UserMatch.associate = function (models) {
    UserMatch.belongsTo(models.User, { as: "UserOne" });
    UserMatch.belongsTo(models.User, { as: "UserTwo" });
  };

  return UserMatch;
};
