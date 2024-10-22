const createAction = require('./actions/create')
const deleteAction = require('./actions/delete')
const findAllAction = require('./actions/find-all')
const findOneAction = require('./actions/find-one')
const updateAction = require('./actions/update')

module.exports = {
  findAll: findAllAction,
  findOne: findOneAction,
  create: createAction,
  update: updateAction,
  delete: deleteAction
}