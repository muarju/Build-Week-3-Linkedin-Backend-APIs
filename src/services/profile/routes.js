import express from "express";
import ProfileSchema from "./Schema.js"
import createError from "http-errors";
import bcrypt from 'bcryptjs'
import {
    checkProfileSchema,
    checkValidationResult,
  } from "./validation.js";

const profileRouter = express.Router();

profileRouter.get("/",async(req,res,next)=>{
  try {
    const profile=await ProfileSchema.find({})
    res.send(profile)
  } catch (error) {
    next(error)
  }
})
profileRouter.post("/",checkProfileSchema,
checkValidationResult,async(req,res,next)=>{
  try {
    const {email, password} = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    const newProfile=new ProfileSchema({...req.body, email:email.toLowerCase(),password:passwordHash})
    const profile=await newProfile.save()
    res.status(201).send(profile)
    
  } catch (error) {
    next(error)
  }
})

profileRouter.get("/:profileId",async(req,res,next)=>{
  try {
    const profileId=req.params.profileId
    const profile=await ProfileSchema.findById(profileId)
    if(profile){
      res.send(profile)
    }
    else{
        next(createError(404, `Profile with id ${req.params.profileId} not found!`));
    }
  } catch (error) {
    next(error)
  }
})
profileRouter.put("/:profileId",async(req,res,next)=>{
  try {
    const modifiedProfile=await ProfileSchema.findByIdAndUpdate(req.params.profileId,
        req.body,{new:true})
        if (modifiedProfile) {
            res.send(modifiedProfile);
          } else {
            next(createError(404, `Profile with id ${req.params.profileId}not found`));
          }
  } catch (error) {
    next(error)
  }
})
profileRouter.delete("/:profileId",async(req,res,next)=>{
  try {
    const deletedProfile = await ProfileSchema.findByIdAndDelete(req.params.profileId);
    if (deletedProfile) {
      res
        .status(204)
        .send(`profile with id ${req.params.profileId} deleted succesfully`);
    } else {
      next(createError(404, `profile with id ${req.params.profileId} not found!`));
    }
  } catch (error) {
    next(error)
  }
})
profileRouter.post("/:profileId/picture",async(req,res,next)=>{
  try {
    
  } catch (error) {
    next(error)
  }
})
profileRouter.get("/:profileId/CV",async(req,res,next)=>{
  try {
    
  } catch (error) {
    next(error)
  }
})

profileRouter.post("/login", async(req,res,next) => {
  try {
    const {email,password}=req.body;
    const data = await ProfileSchema.findOne(
      { "email": email.toLowerCase() },
    );
     // check account found and verify password
    if (!data || !bcrypt.compareSync(password, data.password)) {
      res.status(400).send("authentication failed");
    } else {
      // authentication successful
      res.send(data);
    }
  } catch (error) {
    next(error)
  }
})

export default profileRouter