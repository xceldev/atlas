module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cities', {
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
        validate: {
          isAlpha: true,
          isUppercase: true,
          len: [2, 3]
        }
      },
      regionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'regions',
          key: 'id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('cities')
  }
}