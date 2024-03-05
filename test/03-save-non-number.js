const test = require('tap').test

const SeqFile = require('../seq-file.js')

const fs = require('fs')
const path = require('path')
const sf = path.join(__dirname, '/test.seq')

test('saves non number sequence ids', function (t) {
  const s = new SeqFile(sf)
  s.seq = '1-1110'
  s.save('2-1111')
  setTimeout(function () {
    t.equal(fs.readFileSync(sf, 'ascii'), fs.readFileSync(sf, 'ascii'))
    t.end()
  }, 50)
})
