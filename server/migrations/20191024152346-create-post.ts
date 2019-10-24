import { QueryInterface } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
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
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },

      likeCounts: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
      },

      authorId: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable("Posts");
  }
};
