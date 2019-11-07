"use strict";
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        forget_password: DataTypes.STRING
    }, {});
    User.associate = function (models) {
        User.hasMany(models.Post, {
            foreignKey: "userId",
            as: "author",
            onDelete: "CASCADE"
        });
    };
    return User;
};
//# sourceMappingURL=user.js.map