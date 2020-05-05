'use strict'

const getItems = require('./getItems')

module.exports.showItems = async () => {
  const expenseItems = getItems.getItems()

  let message = '現在の項目一覧です\n'
  message += '----------\n'
  for(let item of expenseItems) {
    message += item + '\n'
  }
  message += '----------'

  return message
}