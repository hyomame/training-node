'use strict'

const inquirer = require('inquirer')

const getItems = require('./getItems')
const setItems = require('./setItems')
const showItems = require('./showItems')

module.exports.addItems = async () => {
  const expenseItems = getItems.getItems()

  const message = await showItems.showItems()
  console.log(message + '\n')

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

    return '登録が完了しました'
  } else {
    return new Error('その項目は既に存在しています')
  }
}