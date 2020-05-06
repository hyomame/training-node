'use strict'

const inquirer = require('inquirer')

const initializeItems = require('../modules/initializeItems')
const addItems = require('../modules/addItems')
const deleteItems = require('../modules/deleteItems')
const showItems = require('../modules/showItems')
const createExpenses = require('../modules/createExpenses')

module.exports.modeSelect = async () => {
  let hasLooped = true
  const modeList = ['initializeItems', 'addItems', 'deleteItems', 'showItems', 'createExpenses', 'exit']

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
      const result = await eval(answers.mode + '.' + answers.mode + '()')
      console.log()
    }
  } while(hasLooped)
}