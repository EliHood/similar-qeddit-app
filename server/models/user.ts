import { DataTypes, Sequelize } from "sequelize";

export interface UserAttributes {
  username?: string;
  password?: string;
  email?: string;
  forget_password?: string;
  emailVerified?:boolean;
  email_confirmation_token?:string;


}
export interface UserInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  password: string;
  email: string;
  forget_password: string;
  emailVerified?:boolean;
  email_confirmation_token?:string;
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
      email_verified:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      email_confirmation_token:{
        type: DataTypes.STRING,
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
    User.hasMany(models.Followers, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'UserFollowers'
    });
    User.hasMany(models.Followers, {
      foreignKey: 'followerId',
      onDelete: 'CASCADE',
      as: 'followerDetails'
    });
    User.hasMany(models.Notification, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Following, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'UserFollowings'
    });

    User.hasMany(models.Following, {
      foreignKey: 'following',
      onDelete: 'CASCADE',
      as: 'followingDetails'
    });


  };

  return User;
};
