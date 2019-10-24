import { Sequelize, DataTypes } from "sequelize";

export interface LikesAttributes {
  likes?: boolean;
  userId?: number;
  resourceId?: number;
  type?: string;
}

export interface LikesInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  likes: boolean;
  userId: number;
  resourceId: number;
  type: string;
}

export = (sequelize: Sequelize, DataTypes: DataTypes) => {
  var Likes = sequelize.define("Likes", {
    likes: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    resourceId: DataTypes.INTEGER,
    type: DataTypes.STRING
  });

  Likes.associate = function(models) {
    Likes.belongsTo(models.User, {
      foreignKey: "userId",
      timestamps: false,
      onDelete: "CASCADE"
    });
    Likes.belongsTo(models.Post, {
      foreignKey: "resourceId",
      timestamps: false,
      onDelete: "CASCADE"
    });
  };

  return Likes;
};
