var Express = require('express')
var cors = require('cors')
var fs = require('fs')
var PNG = require('pngjs').PNG


var app = Express()

app.set('port', (process.env.PORT || 3030));
app.use(cors())

var helloPxon =
  {
    "exif": {
      "software": "http://august.today",
      "artist": "jenn schiffer",
      "imageDescription": "smile",
      "userComment": "an example pixel drawing to show off pxon",
      "copyright": "jenn schiffer 2015",
      "dateTime": "2015-09-17T15:21:51.761Z"
    },
    "pxif": {
      "pixels": [
        {
          "x": 75,
          "y": 69,
          "color": "rgba(0, 0, 0, 1)",
          "size": 15
        },
        {
          "x": 80,
          "y": 84,
          "color": "rgba(0, 0, 0, 1)",
          "size": 15
        },
        {
          "x": 96,
          "y": 82,
          "color": "rgba(0, 0, 0, 1)",
          "size": 15
        },
        {
          "x": 110,
          "y": 83,
          "color": "rgba(0, 0, 0, 1)",
          "size": 15
        },
        {
          "x": 129,
          "y": 72,
          "color": "rgba(0, 0, 0, 1)",
          "size": 15
        },
        {
          "x": 88,
          "y": 40,
          "color": "rgba(0, 0, 0, 1)",
          "size": 15
        },
        {
          "x": 112,
          "y": 38,
          "color": "rgba(0, 0, 0, 1)",
          "size": 15
        },
        {
          "x": 97,
          "y": 57,
          "color": "rgba(0, 0, 0, 1)",
          "size": 15
        }
      ],
      "dataURL": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAy8AAALGCAYAAABMEa7OAAAJyElEQVR4nO3XQQoDQQwDwf3/p5MvOCzByKqCOQ+6uZ8HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOCfPi9e4r8AAEAo8QIAAEQQLwAAQATxAgAARBAvAABABPECAABEEC8AAEAE8QIAAEQQLwAAQATxAgAARBAvAABABPECAABEEC8AAEAE8QIAAEQQLwAAwHkCBAAAiCBeAACACOIFAACIIF4AAIAI4gUAAIggXgAAgAjiBQAAiCBeAACACOIFAACIIF4AAIAI4gUAAIggXgAAgAjiBQAAiCBeAACACOIFAAD4SVtEtO0FAIAz2o75tr0AAHBG2zHfthcAAM5oO+bb9gIAwBltx3zbXgAAOKPtmG/bCwAAZ7Qd8217AQDgjLZjvm0vAACc0XbMt+0FAIAz2o75tr0AAHBG2zHfthcAAM5oO+bb9gIAwBltx3zbXgAAOKPtmG/bCwAAZ7Qd8217AQCA510IbD0AAKDQdoiIFwAAYGQ7RMQLAAAwsh0i4gUAABjZDhHxAgAAjGyHiHgBAABGtkNEvAAAACPbISJeAACAke0QES8AAMDIdoiIFwAAYGQ7RMQLAAAwsh0i4gUAABjZDhHxAgAAjGyHiHgBAABGtkNEvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwKIvLAIBYv9X/6YAAAAASUVORK5CYII="
    }
  }

app.get('/', function(req, res) {
  fs.createReadStream('./images/Chuck-Close.png')
      .pipe(new PNG({
          filterType: 4
      }))
      .on('parsed', function() {
        var pixels = []
        for (var x = 0; x < this.width; x = x+50) {
          for (var y = 0; y < this.height; y = y + 50) {
            pixels.push(getPixel(x, y, this))
          }
        }
        // console.log(pixels)
        var pxon = {
          "exif": {
            "software": "",
            "artist": "Zac Smith",
            "imageDescription": "Chuck Close",
            "userComment": "an example pixel drawing to show off pxon",
            "copyright": "All of you",
            "dateTime": ""
          },
          "pxif": {
            "pixels": pixels,
            "dataURL": ""
          }
        }
        console.log('About to send this across the internet:' + pxon.pxif.pixels)
        res.json(pxon)
      })
})

app.listen(app.get('port'), console.log('Listening so tight on port ' + app.get('port') + '... awww yeah!'))

function getPixel(x, y, imageData) {
  var data = imageData.data
  var idx = (imageData.width * y + x) << 2

  var r = data[idx]
  var g = data[idx+1]
  var b = data[idx+2]
  var a = data[idx+3] / 255 // Is this right?

  var color = 'rgba(' +
    r + ',' +
    g + ',' +
    b + ',' +
    a + ')'

  // Return a pixel in pxon format
  return {
    "x": x,
    "y": y,
    "color": color,
    "size": null // Not dealing with size for now
  }
}
