'use strict'

const fs = require('fs')

module.exports.setItems = (jsonObject) => {
  fs.writeFileSync('./data/expenseItems.json', JSON.stringify(jsonObject, undefined, 2))
}