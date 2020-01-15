import { QueryInterface } from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.createTable('Comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            postId: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            comment_body: {
                type: Sequelize.STRING,
                allowNull: false,
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

    down: (queryInterface: QueryInterface, Sequelize:any) => {
        return queryInterface.dropTable('Comments');
    }
};
