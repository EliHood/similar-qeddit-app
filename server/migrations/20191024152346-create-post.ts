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
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      likeCounts: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
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
