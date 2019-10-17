import { Sequelize, DataTypes } from "sequelize";

export interface UserAttributes {
  username?: string;
  password?: string;
  email?: string;
  forget_password?: string;
}
export interface UserInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  password: string;
  email: string;
  forget_password: string;
}

export = (sequelize: Sequelize, DataTypes: DataTypes) => {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    forget_password: DataTypes.STRING
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};
