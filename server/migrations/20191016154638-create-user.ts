import { QueryInterface } from "sequelize";

export const up = (queryInterface: QueryInterface, Sequelize: any) => {
  return queryInterface.createTable("Users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    gravatar: {
      allowNull: false,
      defaultValue:
        "https://gravatar.com/avatar/4ad2c8eea353c159e4c0320ab8621687?s=400&d=robohash&r=x",
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

    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
};

export const down = (queryInterface: QueryInterface, Sequelize) => {
  return queryInterface.dropTable("Users");
};
