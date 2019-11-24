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
  var User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: "The username can only contain letters and numbers"
          },
          len: {
            args: [6, 25],
            msg: "The username needs to be between 6 and 25 characteres long"
          }
        }
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gravatar: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: 6
        }
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: DataTypes.STRING,
      forget_password: DataTypes.STRING
    },
    {}
  );

  User.associate = function(models) {
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "author",
      onDelete: "CASCADE"
    });
  };

  return User;
};
