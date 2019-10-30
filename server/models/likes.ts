import { Sequelize, DataTypes } from "sequelize";

export interface LikesAttributes {
  likedByme?: boolean;
  resourceId?: number;
  userId?: number;
}

export interface LikesInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  likedByMe: boolean;
  resourceId: number;
  userId: number;
}

export = (sequelize: Sequelize, DataTypes: DataTypes) => {
  var Likes = sequelize.define("Likes", {
    userId: DataTypes.INTEGER,
    resourceId: DataTypes.INTEGER,
    likeByMe: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  Likes.associate = function(models) {
    // associations can be defined here
    Likes.belongsTo(models.User, {
      foreignKey: "userId",
      timestamps: false,
      onDelete: "CASCADE"
    });
    Likes.belongsTo(models.Post, {
      foreignKey: "resourceId",
      timestamps: false,
      onDelete: "CASCADE",
      targetKey: "id"
    });
  };

  return Likes;
};
