module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    age: DataTypes.STRING,
    location: DataTypes.STRING,
    imageURL: DataTypes.STRING,
  });

  User.associate = function (models) {
    User.belongsToMany(User, { as: "UserOne", through: "Matches", foreignKey: "userOneId" });
    User.belongsToMany(User, { as: "UserTwo", through: "Matches", foreignKey: "userTwoId" });
  };

  return User;
};
