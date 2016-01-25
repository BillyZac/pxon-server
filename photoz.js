var fs = require('fs')
var PNG = require('pngjs').PNG

fs.createReadStream('./images/Chuck-Close.png')
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {
      for (var x = 0; x < this.width; x = x+50) {
        for (var y = 0; y < this.height; y = y + 50) {
          console.log(getPixel(x, y, this))
        }
      }
    })

function getPixel(x, y, imageData) {
  var data = imageData.data
  var idx = (imageData.width * y + x) << 2
  var pixel = {
    x: x,
    y: y,
    r: data[idx],
    g: data[idx+1],
    b: data[idx+2],
    a: data[idx+3] / 255 // Is this right?
  }
  return pixel
}
