import { QueryInterface } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.createTable("Likes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },

      likes: {
        type: Sequelize.BOOLEAN
      },

      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },

      resourceId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },

      type: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable("Likes");
  }
};
