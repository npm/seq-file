var fs = require('fs')

module.exports = SeqFile

function SeqFile(file) {
  if (!file)
    throw new TypeError('need to specify a file')

  this.file = file
  this.saving = false
  this.seq = 0
}

SeqFile.prototype.read = function(cb) {
  fs.readFile(this.file, 'ascii', this.onRead.bind(this, cb))
}

SeqFile.prototype.readSync = function() {
  var er, data
  try {
    data = fs.readFileSync(this.file, 'ascii')
  } catch (e) {
    er = e
  }
  return this.onRead(null, er, data)
}

SeqFile.prototype.save = function(n) {
  if (n && n > this.seq)
    this.seq = n

  if (!this.saving) {
    this.saving = true
    var t = this.file + '.TMP'
    var data = this.seq + '\n'
    fs.writeFile(t, data, this.onSave.bind(this))
  }
}

SeqFile.prototype.onSave = function(er) {
  var cb = this.onFinish.bind(this)
  if (!er)
    fs.rename(this.file + '.TMP', this.file, cb)
  else
    fs.unlink(this.file + '.TMP', cb)
}

SeqFile.prototype.onFinish = function() {
  this.saving = false
}

SeqFile.prototype.onRead = function(cb, er, data) {
  if (er && er.code === 'ENOENT')
    data = 0;
  else if (er) {
    if (cb)
      return cb(er)
    else
      throw er
  }

  if (data === undefined)
    data = null

  if (!+data && +data !== 0)
    return cb(new Error('invalid data in seqFile'))

  data = +data
  if (!er && data > this.seq)
    this.seq = data

  if (cb)
    cb(er, data)
  else if (er)
    throw er
  else
    return data
}
