const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const {extend}=require("lodash");
const {Playlist} = require("../model/playlist.model.js")

 router.route("/")
  .get(async (req, res) => {
    try {
      const playlists = await Playlist.find({});
      res.json({success:true,playlists})
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to get playlists", errorMessage: err.message })
    }
  })
  .post(async (req, res) => {
    try {
      const playlist = req.body;
      const Newplaylist = new Playlist(playlist);
      const savedplaylist = await Newplaylist.save();
      res.json({ success: true, playlist: savedplaylist })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to add playlists", errorMessage: err.message })
    }
  })

 router.route("/createplaylist")
 .post(async (req, res) => {
    try {
      const {playlistname:name} = req.body;
      const Newplaylist = new Playlist({playlistname:name,videos:[]});
      const savedplaylist = await Newplaylist.save();
      res.json({ success: true, playlist: savedplaylist })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to create playlists", errorMessage: err.message })
    }
  })



router.param("playlistId",async(req,res,next,playlistId) =>{
try{ 
   const playlist = await Playlist.findById(playlistId);
  if(!playlist){
    return res.status(400).json({success:false,message:"cannot find data"})
  }
  req.playlist = playlist;
  next()
  }
  catch{
    res.status(400).json({success:false,message:"cannot retrive data"})
  }
})

router.route("/:playlistId")
.get((req,res) => {
  let { playlist } = req
  playlist.__v = undefined
  res.json({playlist})
})
.post(async(req,res) => {
  let { playlist } = req;
  const updateplaylist=req.body;
  playlist=extend(playlist,updateplaylist)
  playlist.updated=Date.now();
  playlist= await playlist.save();
  res.json({ success: true, playlist })
})

.delete(async(req,res) => {
  let {playlist}=req;
  await playlist.remove()
  playlist.deleted=true;
  res.json({success: true , playlist})
})

module.exports = router