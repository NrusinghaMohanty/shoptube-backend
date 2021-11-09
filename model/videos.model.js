const mongoose = require("mongoose");
require('mongoose-type-url');


const VideosSchema = new mongoose.Schema({
  name : {
    type:String,
    required:"Cannot enter a video without a name"
  } ,
  imageurl:{
    type:mongoose.SchemaTypes.Url,
    required:"Cannot enter a video without image url"
  },
  channellogourl:{
    type:mongoose.SchemaTypes.Url,
    required:"Cannot enter a video without channel-logo url"
  },
  channelname : {
    type:String,
    required:"Cannot enter a video without a channel name"
  } ,
   date : {
    type:String,
    required:"Cannot enter a video without a date"
  } ,
  videourl:{
    type:mongoose.SchemaTypes.Url,
    required:"Cannot enter a video without video url"
  }}
  ,{ timestamps:true
  })

  
const Videos = mongoose.model("videos",VideosSchema)

module.exports = {Videos}