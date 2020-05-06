'use strict'

const cli = require('cac')()
const inquirer = require('inquirer')

const getItems = require('./getItems')
const setItems = require('./setItems')
const showItems = require('./showItems')

const addItems = async () => {
  const expenseItems = getItems.getItems()

  await showItems.showItems()
  console.log()

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'item',
      message: '追加する項目を入力してください',
    }
  ])
  
  if (expenseItems.indexOf(answers.item) === -1) {
    expenseItems.push(answers.item)
    setItems.setItems(expenseItems)

    console.log('登録が完了しました')
    return true
  } else {
    const error = new Error('その項目は既に存在しています')
    console.log(error)
    return false
  }
}

cli
  .command('add', '家計簿の項目を追加する')
  .action(() => {
    addItems()
  })

cli.parse()

module.exports.addItems = addItems