import { Sequelize, DataTypes } from "sequelize";

export interface RePostAttributes {
  userId?: number;
  postId?: number;
}

export interface RePostInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  userId: number;
  postId: number;
}

export = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const RePosts = sequelize.define("RePosts", {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
  });

  RePosts.associate = function(models) {
    RePosts.belongsTo(models.User, {
      as: "author",
      foreignKey: "userId",
      timestamps: false,
      onDelete: "CASCADE",
    });
    RePosts.belongsTo(models.Post, {
      foreignKey: "postId",
      timestamps: false,
      onDelete: "CASCADE",
      targetKey: "id",
    });
  };

  return RePosts;
};
