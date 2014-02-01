var fs = require('fs')
var sf = __dirname + '/test.seq'
var test = require('tap').test

test('cleanup', function(t) {
  try { fs.unlinkSync(sf) } catch (er) {}
  try { fs.unlinkSync(sf + '.TMP') } catch (er) {}
  t.pass('ok')
  t.end()
})
