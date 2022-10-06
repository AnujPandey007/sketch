const sketchModal = require('../models/sketchModel');

const express = require('express');

const router = express.Router();

router.post('/addSketch', async(req, res)=>{
    try{
      const sketch = await sketchModal.create({
        userId: req.body.userId,
        questionData: req.body.questionData,
        likes: req.body.likes,
        isAnswered: req.body.isAnswered,
        questionTag:req.body.questionTag
      });
      res.json(sketch);
    }catch(e){
      console.log(e.message);
      res.status(404).json(e.message);
    }
});

router.get('/getSketches', async(req, res)=>{
    try{
      const sketch = await sketchModal.find().sort({questionTime: 'descending'});
      //For an ascending sort, you can use "ascending".
      res.json(sketch);
    }catch(e){
      console.log(e.message);
      res.status(404).json(e.message);
    }
});
  
router.get('/getSketch/:id', async(req, res)=>{
    try{
      const sketch = await sketchModal.find({_id: req.params.id});
      res.json(sketch[0]);
    }catch(e){
      console.log(e.message);
      res.status(404).json(e.message);
    }
});
  
router.put('/updateSketch/:id', async(req, res)=>{
    try{
      const sketch = await sketchModal.findByIdAndUpdate(
        req.params.id, {
          userId: req.body.userId,
          questionData: req.body.questionData,
          likes: req.body.likes,
          isAnswered: req.body.isAnswered,
          answerId : req.body.answerId
        },
        {new: true},
      );
      res.json(sketch);
    }catch(e){
      console.log(e.message);
      res.status(404).json(e.message);
    }
});
  
router.delete('/deleteSketch/:id', async (req, res)=>{
    try{
      await sketchModal.findByIdAndDelete(req.params.id);
      res.json("Deleted Successfully");
    }catch(e){
      console.log(e.message);
      res.status(404).json(e.message);
    }
});

module.exports = router;
  