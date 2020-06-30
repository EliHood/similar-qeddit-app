"use strict";
module.exports = (sequelize, DataTypes) => {
    const RePosts = sequelize.define("RePosts", {
        userId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
    });
    RePosts.associate = function (models) {
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
//# sourceMappingURL=repost.js.map