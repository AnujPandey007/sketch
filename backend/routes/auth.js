const User = require('../models/userModel');

const bcrypt = require('bcrypt');
const express = require('express');

const router = express.Router();

//APIs

router.post('/register', async(req, res)=>{
    try{

      const authUser = await User.find({
        userEmail: req.body.userEmail
      });

      if(authUser.length!==0){
        return res.status(404).json("Email already exists!");
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.userPassword, salt);

      const user = await User.create({ 
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
        userEmail: req.body.userEmail,
        userPassword: hashedPassword,
        userGender: req.body.userGender,
        userImage: req.body.userImage
      });
      
      res.json(user);
    }catch(e){
      // res.status(404).json("Something went wrong.");
      console.log(e.message);
      res.status(404).json(e.message);
    }
});

router.post('/login', async(req, res)=>{
    try{
      const user = await User.find({
        userEmail: req.body.userEmail
      });

      if(user.length===0){
        return res.status(404).json("Please login");
      }

      let isPasswordSame = await bcrypt.compare(req.body.userPassword, user[0].userPassword);

      if(isPasswordSame===true){
        res.json(user[0]);
      }else{
        res.status(404).json("Password is wrong");
      }

    }catch(e){
      // res.status(404).json("Something went wrong.");
      console.log(e.message);
      res.status(404).json(e.message);
    }
});

module.exports = router;