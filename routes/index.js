var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var fs = require('fs');
var youtubed = require('youtube-dl');
var jsonParser = bodyParser.json();
//var arr = [];
var info = {}
var percent;

//configs
var config = require('../db/config');

//Models
var Downloads = require('../models/downloads');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title:'YT Download3R'});
  next;
});
//POST DATA LINKS

router.post('/convert',jsonParser,function(req,res,next){
    var data = req.body.link;
    var video = youtubed(data,
    // Optional arguments passed to youtube-dl.
    ['--format=18'],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname });

    //create random numbers to be saved to server
    var randomNum = Math.floor((Math.random() * 100) + 1);
    var path = './public/videos/'+randomNum.toString()+'.mp4';
    video.pipe(fs.createWriteStream(path));

    //Will be called when the download starts.
    var size = 0;
    video.on('info', function(info) {
      'use strict';
      size = info.size;
      var pos = 0;
      video.on('data', function data(chunk) {
        'use strict';
        pos += chunk.length;

        // `size` should not be 0 here.
        if (size) {
          percent = (pos / size * 100).toFixed(2);
          process.stdout.cursorTo(0);
          process.stdout.clearLine(1);
          process.stdout.write(percent + '%');
        }

      });
      video.on('end', function end() {
        'use strict';
        info = {
        filename : info._filename,
        size: info.size
        }
        var downloads = new Downloads({
        name : randomNum,
        path : path,
        filename : info.filename,
        size: info.size
        });

        downloads.save().then(function(data){
          console.log('data saved !');
          console.log(data);
          res.send(data).status(200);
        });
      });
    });

    next;
});

router.get('/download/:file',function(req,res){
  var file = './public/videos/'+req.params.file;
  res.download(file);

});

module.exports = router;
