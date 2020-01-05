"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Posts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            postContent: {
                type: Sequelize.TEXT
            },
            liked: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            likeCounts: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            userId: {
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
        return queryInterface.dropTable("Posts");
    }
};
//# sourceMappingURL=20191024152346-create-post.js.map