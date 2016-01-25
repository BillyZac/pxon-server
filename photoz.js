var fs = require('fs')
var PNG = require('pngjs').PNG

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
      console.log(pxon.pxif.pixels)
    })

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
