const sketchModal = require('../models/sketchModel');

const express = require('express');

const router = express.Router();

router.post('/addSketch', async(req, res)=>{
    try {
      console.log('Data: ', req.body.userId)
      const sketch = await sketchModal.create({
        created_by: req.body.userId,
        collaborator: [req.body.userId],
        image: req.body.image
      });
      res.json(sketch);
    }catch(e){
      console.log(e.message);
      res.status(404).json(e.message);
    }
});

router.get('/getSketches', async(req, res)=>{
    try{
      const sketch = await sketchModal.find({ collaborator: { $in: req.body.userId } }).sort({ createdAt: 'descending' });
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
          $addToSet: { collaborator: req.body.userId },
          image: req.body.image
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
      res.json({status: true});
    }catch(e){
      console.log(e.message);
      res.status(404).json(e.message);
    }
});

module.exports = router;
  