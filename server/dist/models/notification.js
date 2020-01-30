"use strict";
module.exports = (sequelize, DataTypes) => {
    var Notification = sequelize.define('Notification', {
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['read', 'unread']
        },
    });
    Notification.associate = function (models) {
        Notification.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return Notification;
};
//# sourceMappingURL=notification.js.map