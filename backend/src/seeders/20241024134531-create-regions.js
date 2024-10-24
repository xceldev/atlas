module.exports = {
  up: async (queryInterface, Sequelize) => {
    const brazilId = 3
    await queryInterface.bulkInsert('regions', [
      {
        name: 'Paraná',
        code: 'PR',
        countryId: brazilId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rio Grande do Sul',
        code: 'RS',
        countryId: brazilId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Santa Catarina',
        code: 'SC',
        countryId: brazilId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('regions', null, {})
  }
}