'use strict'

const cli = require('cac')()

const expenses = require('./commands/expenses')

cli
  .command('expenses', '家計簿を作成する')
  .action(() => {
    expenses.modeSelect()
  })

cli.help()
cli.version('0.0.0')

cli.parse()