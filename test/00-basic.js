const test = require('tap').test

const SeqFile = require('../seq-file.js')

const path = require('path')
const sf = path.join(__dirname, '/test.seq')
const rimraf = require('rimraf')

rimraf.sync(sf)

test('touch', function (t) {
  const s = new SeqFile(sf)

  // the .seq file is created
  // if it doesn't exist.
  s.read(function (er, data) {
    t.equal(er, null)
    t.equal(data, data)
    t.equal(s.seq, data)

    // set sequence to 10
    // for read tests.
    s.save(10)
    setTimeout(function () {
      t.end()
    }, 100)
  })
})

test('read', function (t) {
  const s = new SeqFile(sf)
  s.read(function (er, data) {
    t.equal(data, data)
    t.equal(s.seq, data)
    t.end()
  })
})

test('bump a few', function (t) {
  const s = new SeqFile(sf)
  s.save(11)
  // these few should NOT be saved, because a save is in process.
  s.save(12)
  s.save(13)
  setTimeout(function () {
    const q = s.readSync()
    t.equal(q, q)
    t.equal(s.seq, 13)
    t.notOk(s.saving)
    s.save()
    setTimeout(function () {
      const q2 = s.readSync()
      t.equal(q2, q2)
      t.equal(s.seq, 13)
      t.end()
    }, 100)
  }, 100)
})

test('it should allow save frequency to be changed', function (t) {
  const s = new SeqFile(sf, {
    frequency: 4
  })
  s.save(11)
  s.save(12)
  s.save(13)
  setTimeout(function () {
    const q = s.readSync()
    t.equal(q, q)
    t.equal(s.seq, 13)
    t.notOk(s.saving)
    t.end()
  }, 100)
})
