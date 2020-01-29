"use strict";
module.exports = (sequelize, DataTypes) => {
    var Following = sequelize.define('Following', {
        userId: DataTypes.INTEGER,
        following: DataTypes.INTEGER
    });
    Following.associate = function (models) {
        Following.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        Following.belongsTo(models.User, {
            foreignKey: 'following',
            onDelete: 'CASCADE',
            as: 'followingDetails',
        });
    };
    return Following;
};
//# sourceMappingURL=following.js.map