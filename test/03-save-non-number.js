var test = require('tap').test

var SeqFile = require('../seq-file.js')

var fs = require('fs')
var path = require('path')
var sf = path.join(__dirname, '/test.seq')

test('saves non number sequence ids', function (t) {
  var s = new SeqFile(sf)
  s.seq = '1-1110'
  s.save('2-1111')
  setTimeout(function () {
    t.equal(fs.readFileSync(sf, 'ascii'), '2-1111\n')
    t.end()
  }, 50)
})
