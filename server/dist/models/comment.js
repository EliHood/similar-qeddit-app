"use strict";
module.exports = (sequelize, DataTypes) => {
    var Comment = sequelize.define('Comments', {
        comment_body: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER
    });
    Comment.associate = function (models) {
        Comment.belongsTo(models.User, {
            as: "author",
            foreignKey: "userId",
            onDelete: "CASCADE"
        });
        Comment.belongsTo(models.Post, {
            foreignKey: "postId",
            timestamps: false,
            onDelete: "CASCADE",
            targetKey: "id"
        });
    };
    return Comment;
};
//# sourceMappingURL=comment.js.map