"use strict";

import { DataTypes } from "sequelize/types";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1000,
          username: "Caesar",
          email_verified: true,
          email: "gajele7019@ascaz.net",
          password: "fish123",
          forget_password: false,
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
          bio: null,
          gravatar: "https://i.pravatar.cc/300",
          email_confirmation_token: "",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
