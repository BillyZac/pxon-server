var Express = require('express')

var app = Express()

app.set('port', (process.env.PORT || 3030));

app.get('/', function(req, res) {
  res.send('okayeee')
})

app.listen(app.get('port'), console.log('Listening so tight on port ' + app.get('port') + '... awww yeah!'))
