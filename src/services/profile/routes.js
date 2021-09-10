import express from "express";
import ProfileSchema from "./Schema.js"
import createError from "http-errors";
import multer from 'multer'
import ExpModel from '../experience/schema.js'
import { mediaStorage } from "../../tools/saveImageCloudinary.js";
import config from '../../tools/auth.config.js'
import authJwt from '../../tools/authJwt.js'
import jwt from 'jsonwebtoken'
import { Readable, pipeline } from 'stream'
import { Transform } from 'json2csv'
import { generateProfileCVPDF } from "../../tools/pdf/index.js";
import bcrypt from 'bcryptjs'

import {
  checkProfileSchema,
  checkValidationResult,
} from "./validation.js";



const profileRouter = express.Router();

profileRouter.get("/", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const profile = await ProfileSchema.find({})
    res.send(profile)
  } catch (error) {
    next(error)
  }
})

profileRouter.post("/", checkProfileSchema,
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

profileRouter.get("/:profileId",[authJwt.verifyToken], async (req, res, next) => {
  try {
    const profileId = req.params.profileId
    const profile = await ProfileSchema.findById(profileId)
    if (profile) {
      res.send(profile)
    }
    else {
      next(createError(404, `Profile with id ${req.params.profileId} not found!`));
    }
  } catch (error) {
    next(error)
  }
})

profileRouter.put("/:profileId",[authJwt.verifyToken], async (req, res, next) => {
  try {

    const {password} = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    const modifiedProfile=await ProfileSchema.findByIdAndUpdate(req.params.profileId,
        {...req.body,password:passwordHash },{new:true})
        if (modifiedProfile) {
            res.send(modifiedProfile);
          } else {
            next(createError(404, `Profile with id ${req.params.profileId}not found`));
          }
  } catch (error) {
    next(error)
  }
})

profileRouter.delete("/:profileId",[authJwt.verifyToken], async (req, res, next) => {
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
profileRouter.put("/:profileId/picture",[authJwt.verifyToken],
multer({ storage: mediaStorage }).single("profileImage"),
async(req,res,next)=>{
  try {
    const image = req.file.path;
      const profileId = req.params.profileId;

      const updatedProfile = await ProfileSchema.findByIdAndUpdate(
        profileId,
        { image },
        { new: true }
      );
      if (updatedProfile) {
        res.send(updatedProfile);
      } else {
        next(createHttpError(404, `Profile with id: ${profileId} not found!`));
      }
  } catch (error) {
    console.log(error);
    next(error)
  }
})

profileRouter.get("/:profileId/CV", async(req,res,next)=>{
  try {
    const profileId=req.params.profileId
    const profile=await ProfileSchema.findById(profileId)
    if(profile){
      const pdfStream = await generateProfileCVPDF(profile);
    res.setHeader("Content-Type", "application/pdf");
    pdfStream.pipe(res);
    pdfStream.end();
    }
    else{
        next(createError(404, `Profile with id ${req.params.profileId} not found!`));
    }
  } catch (error) {
    next(error)
  }
})

// E X P E R I E N C E S     H E R E

profileRouter.get('/:username/experiences',[authJwt.verifyToken], async (req, res, next) => {

  try {
    const data = await ExpModel.find({ username: req.params.username })
    res.send(data)

  } catch (error) {
    console.log(error);
    next(error)
  }
})

profileRouter.get('/:username/experiences/:id',[authJwt.verifyToken], async (req, res, next) => {

  try {
    const { id } = req.params
    const data = await ExpModel.findById(id)
    if (data) {
      res.status(201).send(data)
    } else {
      next(createError(404, `Experience with id: ${id} not found!`))
    }

  } catch (error) {
    console.log(error);
    next(error)
  }
})

profileRouter.post('/:username/experiences',[authJwt.verifyToken], async (req, res, next) => {
  try {
    const data = new ExpModel({ ...req.body, username: req.params.username })
    await data.save()
    res.status(201).send(data._id)
  } catch (error) {
    console.log(error);
    next(error)
  }
})

profileRouter.put('/:username/experiences/:id',[authJwt.verifyToken], async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await ExpModel.findByIdAndUpdate(id, { ...req.body, username: req.params.username }, {
      new: true
    })

    if (data) {
      res.send(data)
    } else {
      next(createError(404, `Experience with id: ${id} not found!`))
    }

  } catch (error) {
    console.log(error);
    next(error)
  }
})

profileRouter.delete('/:username/experiences/:id',[authJwt.verifyToken], async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await ExpModel.findByIdAndDelete(id)

    if (data) {
      res.status(200).send(`The Experience with ID: ${id} has been successfully deleted!`)
    } else {
      next(createError(404, `Experience with ID: ${id} not found!`))
    }

  } catch (error) {
    console.log(error);
    next(error)
  }
})

profileRouter.put("/:username/experiences/:id/image",[authJwt.verifyToken], multer({ storage: mediaStorage }).single("image"), async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await ExpModel.findById(id)
    if (data) {
      const modifiedExperience = await ExpModel.findByIdAndUpdate(id, { image: req.file.path, username: req.params.username }, {
        new: true
      })
      res.send(modifiedExperience)
    } else {
      next(createError(404, `Experience with id: ${id} not found!`))
    }
  }catch(error){
    console.log(error);
    next(error)
  }
})


profileRouter.get('/:username/csv',[authJwt.verifyToken], async (req, res, next) => {
  try {
    const data = await ExpModel.find({username: req.params.username})
    const source = Readable.from(JSON.stringify(data))
    const options = { fields: ["role", "company", "startDate", "endDate", "description", "area"] }
    const transform = new Transform(options)

    res.setHeader("Content-Disposition", "attachment; filename=experiences.csv")
    const destination = res

    pipeline(source, transform, destination, err => {
      if (err) console.log(err)
    })
  } catch (error) {
    next(createError(500, error))
  }

})

profileRouter.post("/login", async(req,res,next) => {
  try {
    
    const {email,password}=req.body;
    const data = await ProfileSchema.findOne(
      { "email": email},
    );
    console.log(data)
    //token generate
    var token = jwt.sign({ id: data._id }, config.secret, {
      expiresIn: 864000 // 24 hours
    });
     // check account found and verify password
    if (!data || !bcrypt.compareSync(password, data.password)) {
      res.status(400).send("authentication failed");
    } else {
      // authentication successful
      res.send({data,accesstoken: token });
    }
  } catch (error) {
    next(error)
  }
})

export default profileRouter