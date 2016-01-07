var fs = require('fs')
var touch = require('touch')

module.exports = SeqFile

function SeqFile(file, opts) {
  if (!file)
    throw new TypeError('need to specify a file')

  opts = opts || {}

  this.file = file
  this.saving = false
  this.seq = 0
  this.frequency = opts.frequency || 1
}

SeqFile.prototype.read = function(cb) {
  var _this = this

  touch(this.file, function() {
    fs.readFile(_this.file, 'ascii', _this.onRead.bind(_this, cb))
  });
}

SeqFile.prototype.readSync = function() {
  var er, data
  try {
    touch.sync(this.file)
    data = fs.readFileSync(this.file, 'ascii')
  } catch (e) {
    er = e
  }
  return this.onRead(null, er, data)
}

SeqFile.prototype.save = function(n) {
  var skip
  if (n){
    if(n > this.seq)
      this.seq = n
    else if(this.seq === 0 && typeof n === 'string')
      this.seq = n
  }

  skip = (n || 0) % this.frequency

  // only save occasionally to cut down on I/O.
  if (!isNaN(skip) && skip !== 0) return

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
    data = 0

  if (data.length > 1) {
    // remove delimiter
    data = (data + '').trim()
    if (/^\d+$/.test(data)) 
      data = + data
    else
      // compare strings
      this.seq = this.seq + ''
  } else {
    data = 0
  }

  if (data > this.seq) 
    this.seq = data

  if (cb)
    cb(er, data)
  else if (er)
    throw er
  else
    return data
}
