'use strict'

const inquirer = require('inquirer')

const getItems = require('./getItems')
const setItems = require('./setItems')

module.exports.deleteItems = async () => {
  const expenseItems = getItems.getItems()

  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'items',
      message: '削除する項目を選んでください',
      choices: expenseItems,
    }
  ])

  for(let item of answers.items) {
    const index = expenseItems.indexOf(item)
    expenseItems.splice(index, 1)
  }
  setItems.setItems(expenseItems)

  return '削除が完了しました'
}