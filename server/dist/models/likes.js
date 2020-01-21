"use strict";
module.exports = (sequelize, DataTypes) => {
    let Likes = sequelize.define("Likes", {
        userId: DataTypes.INTEGER,
        resourceId: DataTypes.INTEGER
    });
    Likes.associate = function (models) {
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
//# sourceMappingURL=likes.js.map