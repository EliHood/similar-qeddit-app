"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        gravatar: {
            allowNull: false,
            defaultValue: "https://i.pravatar.cc/150?img=11",
            type: Sequelize.STRING
        },
        bio: {
            allowNull: true,
            type: Sequelize.TEXT
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isAlphanumeric: {
                    args: true,
                    msg: "The username can only contain letters and numbers"
                },
                len: {
                    args: [4, 127],
                    msg: "The username needs to be between 3 and 25 characteres long"
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                len: {
                    args: [4, 127],
                    msg: "The password needs to be between 4 and 128 characteres long"
                }
            }
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Invalid email"
                }
            }
        },
        forget_password: {
            type: Sequelize.STRING
        },
        googleId: {
            allowNull: true,
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        email_verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        email_confirmation_token: {
            type: Sequelize.STRING
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
};
exports.down = (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
};
//# sourceMappingURL=20191016154638-create-user.js.map