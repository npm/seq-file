var test = require('tap').test

var SeqFile = require('../seq-file.js')

var fs = require('fs')
var sf = __dirname + '/test.seq'

test('reads non number sequence ids froim file', function(t) {
  var s = new SeqFile(sf)
  s.read(function(err,data){
    t.equal(data, '1-1111')
    t.equal(s.seq, '1-1111')
    t.end()
  })
})
