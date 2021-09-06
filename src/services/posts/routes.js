import express from 'express'
import createError from 'http-errors'
import Posts from './schema.js'

const PostsRouter = express.Router()

PostsRouter.get("/", async(req,res,next) => {
    try {
      const posts=await Posts.find({}).populate('user')
      res.send(posts)
    } catch (error) {
      next(error)
    }
})
PostsRouter.get("/:_id", async(req,res,next) => {
    try {
      const postId=req.params._id
      const post=await Posts.findById(postId).populate('user')
      if(post){
        res.send(post)
      }
      else{
          next(createError(404, `Profile with id ${req.params._id} not found!`));
      }
    } catch (error) {
      next(error)
    }
})

PostsRouter.post("/", async(req,res,next) => {
    try {
      const newPost=new Posts(req.body)
      const post=await newPost.save()
      res.status(201).send(post)
    } catch (error) {
      next(error)
    }
})
PostsRouter.put("/:_id", async(req,res,next) => {
    try {
      
    } catch (error) {
      next(error)
    }
})
PostsRouter.delete("/:_id", async(req,res,next) => {
    try {
      
    } catch (error) {
      next(error)
    }
})
export default PostsRouter;