const sketchModal = require('../models/sketchModel');

const express = require('express');

const router = express.Router();

const _MAX_COLLABORATOR_LEN = 5;

router.post('/addSketch', async(req, res)=>{
    try {
      // console.log('Data: ', req.body.userId);
      const sketch = await sketchModal.create({
        created_by: req.body.userId,
        collaborator: [{
          user: req.body.userId,
        }],
        image: req.body.image
      });
      res.json(sketch);
    }catch(e){
      console.log(e.message);
      res.status(404).json(e.message);
    }
});

router.get('/getSketches/:userId', async(req, res)=>{
    try{
      const sketch = await sketchModal.find({ collaborator: { $elemMatch: { user: { $in: req.params.userId } } } }).sort({ createdAt: 'descending' });
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
      const colors = ['red', 'green', 'blue', 'black', 'yellow'];

      let sketch = await sketchModal.findById(req.params.id);

      if (sketch.collaborator.length >= _MAX_COLLABORATOR_LEN) {
        res.status(400).json({ status: false });
        return;
      }

      let updateData = {
        image: req.body.image
      };

      if (req.body.userId) {
        const checkIfUserIdExists = sketch.collaborator.filter((item) => item.user == req.body.userId);
        if (checkIfUserIdExists.length > 0) {
          res.status(400).json({ status: false });
          return;
        }
        updateData = {
          ...updateData,
          $addToSet: { collaborator: { user: req.body.userId, color: colors[sketch.collaborator.length] } },
        }
      }

      sketch = await sketchModal.findByIdAndUpdate(
        req.params.id, updateData,
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
  