"use strict";
module.exports = (sequelize, DataTypes) => {
    var Followers = sequelize.define('Followers', {
        userId: DataTypes.INTEGER,
        followerId: DataTypes.INTEGER
    });
    Followers.associate = function (models) {
        Followers.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'UserFollowers',
            onDelete: 'CASCADE'
        });
        Followers.belongsTo(models.User, {
            foreignKey: 'followerId',
            as: 'followerDetails',
            onDelete: 'CASCADE'
        });
    };
    // Followers.follow = (userId, follower_id) => Followers.create({ userId, follower_id});
    return Followers;
};
//# sourceMappingURL=followers.js.map