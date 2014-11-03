# seq-file

A module for storing the ever-increasing sequence files when following
couchdb _changes feeds.

Saves the sequence ID in an atomic way, so that it doesn't clobber the
file if it crashes mid-save.  Only does a single save at a time, so
you can bang on it repeatedy, and it'll avoid doing unnecessary file
IO or weird cases where two writes cross paths in odd ways.

## USAGE

```javascript
var SF = require('seq-file')
var s = new SF('sequence.seq')

s.save(10)
console.log(s.seq) // 10
s.save(11) // won't actually save, because still saving the 10
console.log(s.seq) // 11.  You get the idea.

// some time in the future, another change comes in
s.save(21)

// oh no!  crash while saving!
s.save(34)
throw 'pwn' // file now contains "21", not ""
```

## OPTIONS

* **frequency:** modify how frequently a sequence number is saved.

```javascript
var SF = require('seq-file', {
  frequency: 4
})
var s = new SF('sequence.seq')
s.save(11) // this won't save (we only save every 4 increments).
s.save(12) // this will totally save.
```
