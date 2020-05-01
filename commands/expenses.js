'use strict'

const fs = require('fs')
const inquirer = require('inquirer')

exports.modeSelect = async () => {
  let hasLooped = true
  const modeList = ['addItem', 'deleteItem', 'showItem', 'createExpenses', 'exit']

  do {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'mode',
        message: 'モードを選択してください',
        choices: modeList,
      }
    ])

    if (answers.mode === 'exit') {
      console.log('終了します')
      hasLooped = false
    } else {
      console.log()
      const result = await eval(answers.mode + '()')

      try {
        if (result) {
          console.log(result)
        }
      } catch(error) {
        console.error(error)
      }
      console.log()
    }
  } while(hasLooped)
}

const addItem = async () => {
  const expenseItems = getItems()

  const message = await showItem()
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
    setItems(expenseItems)

    return '登録が完了しました'
  } else {
    return new Error('その項目は既に存在しています')
  }
}

const deleteItem = async () => {
  const expenseItems = getItems()

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
  setItems(expenseItems)

  return '削除が完了しました'
}

const showItem = async () => {
  const expenseItems = getItems()

  let message = '現在の項目一覧です\n'
  message += '----------\n'
  for(let item of expenseItems) {
    message += item + '\n'
  }
  message += '----------'

  return message
}

const createExpenses = async () => {
  const expenseItems = getItems()

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

const getItems = () => {
  const jsonObject = JSON.parse(fs.readFileSync('./data/expenseItems.json', 'utf8'))

  return jsonObject
}

const setItems = (jsonObject) => {
  fs.writeFileSync('./data/expenseItems.json', JSON.stringify(jsonObject, undefined, 2))
}
