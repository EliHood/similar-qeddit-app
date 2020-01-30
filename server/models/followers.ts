import { DataTypes, Sequelize } from "sequelize";

export interface FollowersAttributes {
  // followerId ? : number;
  followerId?: number;
}

export interface FollowersInstance {
  createdAt: Date;
  updatedAt: Date;
  followerId: number;
}

export = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Followers = sequelize.define("Followers", {
    userId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  });

  Followers.associate = function(models) {
    Followers.belongsTo(models.User, {
      foreignKey: "userId",
      as: "UserFollowers",
      onDelete: "CASCADE"
    });
    Followers.belongsTo(models.User, {
      foreignKey: "followerId",
      as: "followerDetails",
      onDelete: "CASCADE"
    });
  };
  // Followers.follow = (userId, follower_id) => Followers.create({ userId, follower_id});
  return Followers;
};
