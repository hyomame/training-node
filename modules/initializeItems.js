'use strict'

const cli = require('cac')()
const fs = require('fs')
const inquirer = require('inquirer')

const initializeItems = async () => {
  let hasLooped = true
  let items = []

  console.log('初期データを構築します')
  do {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'item',
        message: '項目を入力してください ("end"で終了します)'
      }
    ])

    if (answers.item === 'end') {
      hasLooped = false
    } else if (items.indexOf(answers.item) !== -1) {
      console.error('その項目は既に存在しています')
    } else {
      items.push(answers.item)
    }
  } while(hasLooped)

  try {
    fs.mkdirSync('data')
    fs.writeFileSync('./data/expenseItems.json', JSON.stringify(items, undefined, 2))
    console.log('初期データの構築が完了しました')
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

cli
  .command('initialize', '家計簿の初期データを構築する')
  .action(() => {
    initializeItems()
  })

cli.parse()

module.exports.initializeItems = initializeItems