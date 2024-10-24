module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('countries', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlpha: true,
          isUppercase: true,
          len: 3
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('countries')
  }
}