import {
    QueryInterface,
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize:any) => {
        return queryInterface.createTable('Followers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                  model: 'Users',
                  key: 'id'
                }
            },
            followerId:{
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                  model: 'Users',
                  key: 'id'
                }
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

    down: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.dropTable('Followers');
    }
};
