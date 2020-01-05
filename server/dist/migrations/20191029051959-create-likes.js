"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Likes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            likeByMe: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            resourceId: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Likes");
    }
};
//# sourceMappingURL=20191029051959-create-likes.js.map