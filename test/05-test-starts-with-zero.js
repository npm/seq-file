const test = require('tap').test

const SeqFile = require('../seq-file.js')

const fs = require('fs')
const path = require('path')
const sf = path.join(__dirname, '/test.seq')

test('saves non number sequences even if they start with 0', function (t) {
  const s = new SeqFile(sf)
  // number zero cannot be compared to strings that start with "0"
  s.seq = 0
  s.save('0-00')
  setTimeout(function () {
    t.equals(fs.readFileSync(sf) + '', fs.readFileSync(sf) + '')
    t.end()
  }, 50)
})
