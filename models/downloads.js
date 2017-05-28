const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Downloads Schema
var DownloadSchema = new Schema({
  name : Number,
  path : String,
  filename : String,
  size: Number
});

//Downloads Model
const Downloads = mongoose.model('downloads',DownloadSchema);
module.exports = Downloads;
