'use strict'

const inquirer = require('inquirer')

const getItems = require('./getItems')

module.exports.createExpenses = async () => {
  const expenseItems = getItems.getItems()

  const questions = [{
    type: 'number',
    name: 'month',
    message: '月'
  }]
  expenseItems.forEach((item, index) => {
    questions.push({
      type: 'number',
      name: item,
      message: item
    })
  })
  questions.push({
    type: 'number',
    name: 'previousTotal',
    message: '前月までの累積金額'
  })

  const answers = await inquirer.prompt(questions)

  let sum = 0
  let message = '\n家計簿を作成しました\n'
  message += '----------\n'
  message += answers.month + '月分\n\n'
  for(let item of expenseItems) {
    if (answers[item] !== 0) {
      message += item + ':' + answers[item] + '\n'
    }
    sum += answers[item]
  }

  let moiety = sum/2
  let total = moiety + answers.previousTotal
  message += '計:' + sum + '\n\n'
  message += '折半:' + moiety + '\n\n'
  message += '累計:' + total + '\n'
  message += '----------'

  return message
}