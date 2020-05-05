'use strict'

const fs = require('fs')

module.exports.getItems = () => {
  return JSON.parse(fs.readFileSync('./data/expenseItems.json', 'utf8'))
}