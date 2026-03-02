'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      totalOrders: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      favoriteStores: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL(3, 2),
        defaultValue: 0,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('user', 'admin', 'store_owner'),
        defaultValue: 'user',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      resetPasswordOtp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resetPasswordExpires: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
