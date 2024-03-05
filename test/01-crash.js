var test = require('tap').test

var SeqFile = require('../seq-file.js')

var path = require('path')
var sf = path.join(__dirname, '/test.seq')
var fs = require('fs')
fs.writeFileSync(sf, '10\n', 'ascii')

test('setup', function (t) {
  var s = new SeqFile(sf)
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
    var fd = fs.openSync(path, 'w')
    fs.closeSync(fd)
    process.nextTick(t.end.bind(t))
  }
  var s = new SeqFile(sf)
  s.save(11)
})
