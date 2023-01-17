var test = require('tap').test

var SeqFile = require('../seq-file.js')

var path = require('path')
var sf = path.join(__dirname, '/test.seq')

test('reads non number sequence ids from file', function (t) {
  var s = new SeqFile(sf)
  s.read(function (err, data) {
    t.equal(data, '2-1111')
    t.equal(s.seq, '2-1111')
    t.same(err, undefined)
    t.end()
  })
})
