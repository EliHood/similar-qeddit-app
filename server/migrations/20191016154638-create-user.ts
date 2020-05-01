import { QueryInterface } from "sequelize";

export const up = (queryInterface: QueryInterface, Sequelize: any) => {
  return queryInterface.createTable("Users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    gravatar: {
      allowNull: false,
      defaultValue:
        "https://api.adorable.io/avatars/400/bf1eed82fbe37add91cb4192e4d14de6.png",
      type: Sequelize.STRING,
    },
    bio: {
      allowNull: true,
      type: Sequelize.TEXT,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        len: {
          args: [4, 127],
          msg: "The username needs to be between 3 and 25 characteres long",
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [4, 127],
          msg: "The password needs to be between 4 and 128 characteres long",
        },
      },
    },

    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email",
        },
      },
    },

    forget_password: {
      type: Sequelize.STRING,
    },
    googleId: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    email_verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    email_confirmation_token: {
      type: Sequelize.STRING,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
};

export const down = (queryInterface: QueryInterface, Sequelize) => {
  return queryInterface.dropTable("Users");
};
