"use strict";
module.exports = (sequelize, DataTypes) => {
    var CommentReplies = sequelize.define("CommentReplies", {
        replyBody: DataTypes.TEXT,
        userId: DataTypes.INTEGER,
        commentId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
    });
    CommentReplies.associate = function (models) {
        CommentReplies.belongsTo(models.User, {
            as: "author",
            foreignKey: "userId",
            onDelete: "CASCADE",
        });
        CommentReplies.belongsTo(models.Post, {
            foreignKey: "postId",
            timestamps: false,
            onDelete: "CASCADE",
            targetKey: "id",
        });
        CommentReplies.belongsTo(models.Comments, {
            as: "commentReplies",
            foreignKey: "commentId",
            timestamps: false,
            onDelete: "CASCADE",
            targetKey: "id",
        });
    };
    return CommentReplies;
};
//# sourceMappingURL=commentreplies.js.map