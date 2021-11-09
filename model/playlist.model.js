const mongoose = require("mongoose");
require('mongoose-type-url');
const { Schema } = mongoose;
const PlaylistSchema = new mongoose.Schema({
      playlistname: {
        type: String,
        required: "Cannot create a playlist without a name",
        unique: "playlist name should be unique",
      },
      videos: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            ref: "videos",
          }
        }
      ]
 },
  { timestamps:true
  })
  const Playlist = mongoose.model("playlist",PlaylistSchema)
module.exports = {Playlist}