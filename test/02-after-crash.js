var test = require('tap').test

var SeqFile = require('../seq-file.js')

var fs = require('fs')
var sf = __dirname + '/test.seq'

test('recover from mid-save crash', function(t) {
  var s = new SeqFile(sf)
  t.equal(fs.readFileSync(sf, 'ascii'), '10\n')
  t.end()
})
