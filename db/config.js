const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Declaring Global promises
mongoose.connect('<mongo_credentials>'); //connecting to yt db

mongoose.connection.once('open',function(){
  console.log('Successfully Connected To DB !');
}).on('error',function(){
  console.log('Cannot Connect To DB!');
});
