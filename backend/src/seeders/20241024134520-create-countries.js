module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('countries', [
      {
        name: 'Argentina',
        code: 'ARG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bolívia',
        code: 'BOL',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Brasil',
        code: 'BRA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chile',
        code: 'CHI',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Colômbia',
        code: 'COL',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Equador',
        code: 'EQU',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Paraguai',
        code: 'PAR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Peru',
        code: 'PER',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Uruguai',
        code: 'URU',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Venezuela',
        code: 'VEN',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('countries', null, {})
  }
}