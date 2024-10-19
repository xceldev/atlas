const createAction = require('./action/create')
const deleteAction = require('./action/delete')
const findAllAction = require('./action/find-all')
const findOneAction = require('./action/find-one')
const updateAction = require('./action/update')

module.exports = {
  findAll: findAllAction,
  findOne: findOneAction,
  create: createAction,
  update: updateAction,
  delete: deleteAction
}