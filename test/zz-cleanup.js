var fs = require('fs')
var path = require('path')
var sf = path.join(__dirname, '/test.seq')
var test = require('tap').test

test('cleanup', function (t) {
  try { fs.unlinkSync(sf) } catch (er) {}
  try { fs.unlinkSync(sf + '.TMP') } catch (er) {}
  t.pass('ok')
  t.end()
})
