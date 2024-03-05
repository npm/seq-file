const test = require('tap').test
const fs = require('fs')
const path = require('path')
const sf = path.join(__dirname, '/test.seq')

// Setup function to create the file if it doesn't exist
function setup () {
  if (!fs.existsSync(sf)) {
    fs.writeFileSync(sf, '10\n', 'ascii')
  }
}

test('recover from mid-save crash', function (t) {
  setup() // Call the setup function before running the test
  t.equal(fs.readFileSync(sf, 'ascii'), '10\n')
  t.end()
})
