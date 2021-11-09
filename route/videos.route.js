const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const {extend}=require("lodash");
const {Videos} = require("../model/videos.model.js")


router.route("/")
  .get(async (req, res) => {
    try {
      const videos = await Videos.find({});
      res.json({videos})
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message })
    }

  })
  .post(async (req, res) => {
    try {
      const video = req.body;
      const Newvideo = new Videos(video);
      const savedvideo = await Newvideo.save();
      res.json({ success: true, video: savedvideo })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to add products", errorMessage: err.message })
    }
  })

  router.param("videoId",async(req,res,next,videoId) =>{
try{ 
   const video = await Videos.findById(videoId);
  if(!video){
    return res.status(400).json({success:false,message:"cannot find data"})
  }
  req.video = video;
  next()
  }
  catch{
    res.status(400).json({success:false,message:"cannot retrive data"})
  }
})

router.route("/:videoId")
.get((req,res) => {
  let { video } = req
  video.__v = undefined
  res.json({video})
})
.post(async(req,res) => {
  let { video } = req;
  const updatevideo=req.body;
  video=extend(video,updatevideo)
  video.updated=Date.now();
  video= await video.save();
  res.json({ success: true, video })
})

.delete(async(req,res) => {
  let {video}=req;
  await video.remove()
  video.deleted=true;
  res.json({success: true , video})
})


 
module.exports = router