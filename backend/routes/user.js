const userModel = require('../models/userModel');

const express = require('express');

const router = express.Router()

//APIs
router.get('/getUsers', async(req, res)=>{
    try{
      const user = await userModel.find();
      res.json(user);
    }catch(e){
      // res.status(404).json("Something went wrong.");
      console.log(e.message);
      res.status(404).json(e.message);
    }
});
  
router.get('/getUser/:id', async(req, res)=>{
    try{
      const user = await userModel.find({_id: req.params.id});
      res.json(user[0]);
    }catch(e){
      // res.status(404).json("Something went wrong.");
      console.log(e.message);
      res.status(404).json(e.message);
    }
});

// router.patch('/updateUserEmail/:id', async(req, res)=>{
//     try{
//       const user = await userModel.findByIdAndUpdate(
//         req.params.id, {
//           userEmail: req.body.userEmail
//         },
//         {new: true},
//       );
//       res.json(user);
//     }catch(e){
//       // res.status(404).json("Something went wrong.");
//       console.log(e.message);
//       res.status(404).json(e.message);
//     }
// });
  
router.put('/updateUser/:id', async(req, res)=>{
    try{
      const user = await userModel.findByIdAndUpdate(
        req.params.id, {
          userName: req.body.userName,
          userAge: req.body.userAge,
          userEmail: req.body.userEmail,
          userPassword: req.body.userPassword,
          userGender: req.body.userGender,
          userImage: req.body.userImage
        },
        {new: true},
      );
      res.json(user);
    }catch(e){
      // res.status(404).json("Something went wrong.");
      console.log(e.message);
      res.status(404).json(e.message);
    }
});
  
router.delete('/deleteUser/:id', async (req, res)=>{
    try{
      await userModel.findByIdAndDelete(req.params.id);
      res.json("Deleted Successfully");
    }catch(e){
      // res.status(404).json("Something went wrong.");
      console.log(e.message);
      res.status(404).json(e.message);
    }
});

module.exports = router;
  