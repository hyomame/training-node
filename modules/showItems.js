'use strict'

const cli = require('cac')()
const getItems = require('./getItems')

const showItems = async () => {
  const expenseItems = getItems.getItems()

  let message = '現在の項目一覧です\n'
  message += '----------\n'
  for(let item of expenseItems) {
    message += item + '\n'
  }
  message += '----------'

  console.log(message)
  return true
}

cli
  .command('show', '項目の一覧を表示する')
  .action(() => {
    showItems()
  })

cli.parse()

module.exports.showItems = showItems