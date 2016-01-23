var Express = require('express')

var app = Express()

app.get('/', function(req, res) {
  res.send('okayeee')
})

app.listen(3030, console.log('Listening so tight... awww yeah!'))
