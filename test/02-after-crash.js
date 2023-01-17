var test = require('tap').test

var fs = require('fs')
var path = require('path')
var sf = path.join(__dirname, '/test.seq')

test('recover from mid-save crash', function (t) {
  t.equal(fs.readFileSync(sf, 'ascii'), '10\n')
  t.end()
})
