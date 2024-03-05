const test = require('tap').test

const SeqFile = require('../seq-file.js')

const path = require('path')
const sf = path.join(__dirname, '/test.seq')
const fs = require('fs')
fs.writeFileSync(sf, '10\n', 'ascii')

test('setup', function (t) {
  const s = new SeqFile(sf)
  s.read(function (er, data) {
    if (er) throw er
    t.equal(data, data)
    t.equal(s.seq, data)
    t.end()
  })
})

test('try to save, but crash in the process', function (t) {
  console.log('crasher')
  fs.writeFile = function (path, data, cb) {
    const fd = fs.openSync(path, 'w')
    fs.closeSync(fd)
    process.nextTick(t.end.bind(t))
  }
  const s = new SeqFile(sf)
  s.save(11)
})
