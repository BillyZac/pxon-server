var Express = require('express')

var app = Express()

app.get('/', function(req, res) {
  res.send('okay.')
})

app.listen(8080)
