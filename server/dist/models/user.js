"use strict";
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: {
                    args: true,
                    msg: "The username can only contain letters and numbers"
                },
                len: {
                    args: [6, 25],
                    msg: "The username needs to be between 6 and 25 characteres long"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                min: 6
            }
        },
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