'use strict'

const cli = require('cac')()
const inquirer = require('inquirer')

const getItems = require('./getItems')
const setItems = require('./setItems')

const deleteItems = async () => {
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

  console.log('削除が完了しました')
  return true
}

cli
  .command('delete', '家計簿の項目を削除する')
  .action(() => {
    deleteItems()
  })

cli.parse()

module.exports.deleteItems = deleteItems