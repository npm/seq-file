const fs = require('fs')
const path = require('path')
const sf = path.join(__dirname, '/test.seq')
const test = require('tap').test

test('cleanup', function (t) {
  try {
    fs.unlinkSync(sf)
  } catch (er) {}
  try {
    fs.unlinkSync(sf + '.TMP')
  } catch (er) {}
  t.pass('ok')
  t.end()
})
