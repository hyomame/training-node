'use strict'

const fs = require('fs')

module.exports.initializeItems = async () => {
  const content = [
    "西友(/11~/10)",
    "インターネット(月分)",
    "電気ガス(月分)",
    "水道(~月分)",
    "スギ薬局",
    "100均",
    "家賃送金",
    "new"
  ]
  try {
    fs.mkdirSync('data')
  } catch (error) {
    return error
  }
  fs.writeFileSync('./data/expenseItems.json', JSON.stringify(content, undefined, 2))
}