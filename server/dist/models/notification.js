"use strict";
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define("Notification", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["read", "unread"]
        }
    });
    Notification.associate = function (models) {
        Notification.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        });
    };
    return Notification;
};
//# sourceMappingURL=notification.js.map