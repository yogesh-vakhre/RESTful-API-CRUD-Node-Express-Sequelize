'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return Promise.all([
      queryInterface.addColumn(
        'users', // table name
        'password', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
          after: "email"
        },
      ),
      queryInterface.addColumn(
        'users',
        'token',
        {
          type: Sequelize.STRING,
          allowNull: true,
          after: "password"
        },
      ),      
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */    
    return Promise.all([
      queryInterface.removeColumn('users', 'password'),
      queryInterface.removeColumn('users', 'token'),
    ]);
  }
};
