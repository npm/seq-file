var test = require('tap').test

var SeqFile = require('../seq-file.js')

var fs = require('fs')
var sf = __dirname + '/test.seq'

test('saves non number sequences even if they start with 0', function(t) {
  var s = new SeqFile(sf)
  // number zero cannot be compared to strings that start with "0"
  s.seq = 0  
  s.save('0-00')
  setTimeout(function(){
    t.equals(fs.readFileSync(sf)+'','0-00\n')
    t.end()
  },50)

})
