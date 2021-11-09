const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const {extend}=require("lodash");
const {WatchLater} = require("../model/watchlater.model.js")


router.route("/")
  .get(async (req, res) => {
    try {
      const watchLatervideos = await WatchLater.find({});
      res.json({watchLatervideos})
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message })
    }

  })
  .post(async (req, res) => {
    try {
      const watchLatervideos = req.body;
      const NewwatchLatervideo = new WatchLater(watchLatervideos);
      const savewatchLatervideos = await NewwatchLatervideo.save();
      res.json({ success: true, watchLatervideos: savewatchLatervideos })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to add products", errorMessage: err.message })
    }
  })

  router.param("watchLatervideoId",async(req,res,next,watchLatervideoId) =>{
try{ 
   const watchLatervideos = await WatchLater.findById(watchLatervideoId);
  if(!watchLatervideos){
    return res.status(400).json({success:false,message:"cannot find data"})
  }
  req.watchLatervideos = watchLatervideos;
  next()
  }
  catch{
    res.status(400).json({success:false,message:"cannot retrive data"})
  }
})

router.route("/:watchLatervideoId")
.get((req,res) => {
  let { watchLatervideos } = req
  watchLatervideos.__v = undefined
  res.json({watchLatervideos})
})
.post(async(req,res) => {
  let { watchLatervideos } = req;
  const updatewatchLatervideos=req.body;
  watchLatervideos=extend(watchLatervideos,updatewatchLatervideos)
  watchLatervideos.updated=Date.now();
  watchLatervideos= await watchLatervideos.save();
  res.json({ success: true, watchLatervideos })
})

.delete(async(req,res) => {
  let {watchLatervideos}=req;
  await watchLatervideos.remove()
  watchLatervideos.deleted=true;
  res.json({success: true , watchLatervideos})
})


 
module.exports = router