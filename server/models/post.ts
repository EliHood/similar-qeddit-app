import { Sequelize, DataTypes } from "sequelize";

export interface PostAttributes {
  title?: string;
  postContent?: string;
  liked?: boolean;
  likeCounts?: number;
  authorId?: number;
}

export interface PostInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  title: string;
  postContent: string;
  liked: boolean;
  likeCounts: number;
  authorId: number;
}

export = (sequelize: Sequelize, DataTypes: DataTypes) => {
  var Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    postContent: DataTypes.STRING,
    liked: DataTypes.BOOLEAN,
    likeCounts: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  });

  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      as: "author",
      foreignKey: "authorId",
      onDelete: "CASCADE"
    });
    Post.hasMany(models.Likes, {
      foreignKey: "resourceId",
      timestamps: false,
      onDelete: "CASCADE",
      scope: {
        type: "article"
      }
    });
  };

  return Post;
};
