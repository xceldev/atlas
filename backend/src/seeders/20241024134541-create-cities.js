module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rioGrandeDoSulId = 2
    await queryInterface.bulkInsert('cities', [
      {
        name: 'Caxias do Sul',
        code: 'CXS',
        regionId: rioGrandeDoSulId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pelotas',
        code: 'PEL',
        regionId: rioGrandeDoSulId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Porto Alegre',
        code: 'POA',
        regionId: rioGrandeDoSulId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Santa Maria',
        code: 'SMA',
        regionId: rioGrandeDoSulId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cities', null, {})
  }
}