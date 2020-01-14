"use strict";
module.exports = (sequelize, DataTypes) => {
    var Post = sequelize.define("Post", {
        title: DataTypes.STRING,
        postContent: DataTypes.STRING,
        likedByMe: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        likeCounts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
            }
        },
        userId: DataTypes.INTEGER
    }, {});
    Post.associate = function (models) {
        Post.belongsTo(models.User, {
            as: "author",
            foreignKey: "userId",
            onDelete: "CASCADE"
        });
        Post.hasMany(models.Likes, {
            foreignKey: "resourceId",
            timestamps: false,
            targetKey: "id",
            onDelete: "CASCADE"
        });
    };
    return Post;
};
//# sourceMappingURL=post.js.map