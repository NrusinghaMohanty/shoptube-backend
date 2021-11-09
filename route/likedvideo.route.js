const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const {extend}=require("lodash");
const {LikedVideos} = require("../model/likedvideo.model.js")


router.route("/")
  .get(async (req, res) => {
    try {
      const likeVideos = await LikedVideos.find({});
      res.json({likeVideos})
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message })
    }

  })
  .post(async (req, res) => {
    try {
      const likeVideos = req.body;
      const NewlikeVideo = new LikedVideos(likeVideos);
      const savelikeVideo = await NewlikeVideo.save();
      res.json({ success: true, video: savelikeVideo })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to add products", errorMessage: err.message })
    }
  })

  router.param("videoId",async(req,res,next,likeVideoId) =>{
try{ 
   const likeVideo = await LikedVideos.findById(likeVideoId);
  if(!likeVideo){
    return res.status(400).json({success:false,message:"cannot find data"})
  }
  req.likeVideo = likeVideo;
  next()
  }
  catch{
    res.status(400).json({success:false,message:"cannot retrive data"})
  }
})

router.route("/:likeVideoId")
.get((req,res) => {
  let { likeVideo } = req
  likeVideo.__v = undefined
  res.json({likeVideo})
})
.post(async(req,res) => {
  let { likeVideo } = req;
  const updatelikeVideo=req.body;
  likeVideo=extend(likeVideo,updatelikeVideo)
  likeVideo.updated=Date.now();
  likeVideo= await likeVideo.save();
  res.json({ success: true, likeVideo })
})

.delete(async(req,res) => {
  let {likeVideo}=req;
  await likeVideo.remove()
  likeVideo.deleted=true;
  res.json({success: true , likeVideo})
})


 
module.exports = router