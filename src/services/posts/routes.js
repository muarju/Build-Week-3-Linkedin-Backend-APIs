import express from 'express'
import createError from 'http-errors'
import Posts from './schema.js'

const PostsRouter = express.Router()

PostsRouter.get("/", async(req,res,next) => {
    try {
      
    } catch (error) {
      next(error)
    }
})
PostsRouter.get("/:_id", async(req,res,next) => {
    try {
      
    } catch (error) {
      next(error)
    }
})

PostsRouter.post("/", async(req,res,next) => {
    try {
      
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