const test = require('tap').test

const SeqFile = require('../seq-file.js')

const path = require('path')
const sf = path.join(__dirname, '/test.seq')

test('reads non number sequence ids from file', function (t) {
  const s = new SeqFile(sf)
  s.read(function (err, data) {
    t.equal(data, data)
    t.equal(s.seq, data)
    t.same(err, undefined)
    t.end()
  })
})
