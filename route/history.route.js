const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const {extend}=require("lodash");
const {History} = require("../model/history.model.js")


router.route("/")
  .get(async (req, res) => {
    try {
      const history = await History.find({});
      res.json({success:true,history})
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message })
    }

  })
  .post(async (req, res) => {
    try {
      const history = req.body;
      const NewhistoryVideo = new History(history);
      const saveNewhistoryVideo = await NewhistoryVideo.save();
      res.json({ success: true, history: saveNewhistoryVideo })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to add products", errorMessage: err.message })
    }
  })

  router.param("historyId",async(req,res,next,historyId) =>{
try{ 
   const history = await History.findById(historyId);
  if(!history){
    return res.status(400).json({success:false,message:"cannot find data"})
  }
  req.history = history;
  next()
  }
  catch{
    res.status(400).json({success:false,message:"cannot retrive data"})
  }
})

router.route("/:historyId")
.get((req,res) => {
  let { history } = req
  history.__v = undefined
  res.json({history})
})
.post(async(req,res) => {
  let { history } = req;
  const updatehistory=req.body;
  history=extend(history,updatehistory)
  history.updated=Date.now();
  history= await history.save();
  res.json({ success: true, history })
})

.delete(async(req,res) => {
  let {history}=req;
  await history.remove()
  history.deleted=true;
  res.json({success: true , history})
})


 
module.exports = router