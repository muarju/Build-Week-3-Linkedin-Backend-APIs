import express from 'express'
import createError from 'http-errors'
import Posts from './schema.js'
import Comment from '../comments/schema.js'
import multer from 'multer'
import { mediaStorage } from '../../tools/saveImageCloudinary.js'
import config from '../../tools/auth.config.js'
import authJwt from '../../tools/authJwt.js'

const PostsRouter = express.Router()

PostsRouter.get("/",[authJwt.verifyToken], async(req,res,next) => {
    try {
      const posts=await Posts.find({}).populate('user').populate('Comments')
      res.send(posts)
    } catch (error) {
      next(error)
    }
})
PostsRouter.get("/:_id",[authJwt.verifyToken], async(req,res,next) => {
    try {
      const postId=req.params._id
      const post=await Posts.findById(postId).populate('user').populate('Comments')
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

PostsRouter.post("/",[authJwt.verifyToken], async(req,res,next) => {
    try {
      const newPost=new Posts(req.body)
      const post=await newPost.save()
      res.status(201).send(post)
    } catch (error) {
      next(error)
    }
})
PostsRouter.put("/:_id",[authJwt.verifyToken], async(req,res,next) => {
    try {
      const modifiedPost=await Posts.findByIdAndUpdate(req.params._id,
        req.body,{new:true})
      if (modifiedPost) {
          res.send(modifiedPost);
        } else {
          next(createError(404, `Post with id ${req.params._id} not found`));
        }
    } catch (error) {
      next(error)
    }
})
PostsRouter.delete("/:_id",[authJwt.verifyToken], async(req,res,next) => {
    try {
      const { _id } = req.params
      const deletedPost = await Posts.findByIdAndDelete(req.params._id);
      if (deletedPost) {
        res.status(200).send(`Post with id ${_id} deleted successfully`);
      } else {
        next(createError(404, `Post with id ${_id} not found!`));
      }
    } catch (error) {
      next(error)
    }
})

PostsRouter.put("/:id/image",[authJwt.verifyToken], multer({ storage: mediaStorage }).single("image"), async (req, res, next) => {
  try {
      const { id } = req.params
      const data = await Posts.findById(id)
      if (data) {
          const modifiedPost = await Posts.findByIdAndUpdate(id, { image: req.file.path }, {
              new: true
          })
          res.send(modifiedPost)
      } else {
          next(createError(404, `Experience with id: ${id} not found!`))
      }
  } catch (error) {
      console.log(error);
      next(error)
  }
})

PostsRouter.get("/:postId/like/:userId",[authJwt.verifyToken], async(req,res,next) => {
  try {
    const {postId, userId} = req.params
    const isLiked = await Posts.find( { likes: userId } )
    let response
    if (isLiked.length === 0 ){
       response = await Posts.findByIdAndUpdate(postId, {$push : {
        likes: userId
      }}, {new: true})
      
    } else {
      response = await Posts.findByIdAndUpdate(postId, {$pull : {
        likes: userId
      }}, {new: true})
    }
    res.send({totalLikes: response.likes.length, currentUserLike: response.likes.includes(userId)? true: false})
  } catch (error) {
    res.status(500)
    next(error)
  }
})

PostsRouter.get("/:postId/comment",[authJwt.verifyToken], async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.postId).populate('Comments')
    res.send(post.Comments)
  } catch (error) {
    next(error)
  }
})
PostsRouter.get("/:postId/comment/:_id",[authJwt.verifyToken], async (req, res, next) => {
  try {
    const commentId = req.params._id
    const comment = await Comment.findById(commentId)
    if (comment) {
      res.send(comment)
    } else {
      next(
        createError(
          404,
          `The comment with the id ${req.params._id} was not not found!`
        )
      )
    }
  } catch (error) {
    next(error)
  }
})

PostsRouter.post("/:postId/comment",[authJwt.verifyToken], async (req, res, next) => {
  try {
    const newComment = await Comment.create(req.body);
    if (newComment) {
      const commentId = newComment._id
      const addComment = await Posts.findByIdAndUpdate(
        req.params.postId,
        { $push: { Comments: commentId } }
      );
      res.status(201).send(addComment);  
    } else {
      next(createHttpError(400, { errorsList }));
    }
  } catch (error) {
    next(error)
  }
})



PostsRouter.put("/:postId/comment/:_id",[authJwt.verifyToken], async (req, res, next) => {
  try {
    const modifiedComment = await Comment.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    )
    if (modifiedComment) {
      res.send(modifiedComment)
    } else {
      next(
        createError(
          404,
          `The comment with the id ${req.params._id} was nonot found`
        )
      )
    }
  } catch (error) {
    next(error)
  }
})
PostsRouter.delete("/:postId/comment/:_id",[authJwt.verifyToken], async (req, res, next) => {
  try {
    const { _id,postId } = req.params
    const deletedComment = await Comment.findByIdAndDelete(_id)
    if (deletedComment) {
      const DeleteCommentFromPost = await Posts.findByIdAndUpdate(
        postId,
        { $pull: { Comments: _id } }
      );
      res.status(200).send(`The comment with the id ${_id} was successfully deleted `)
    } else {
      next(createError(404, `The comment with the id ${_id} was not found!`))
    }
  } catch (error) {
    next(error)
  }
})

PostsRouter.put(
  "/:id/image",[authJwt.verifyToken],
  multer({ storage: mediaStorage }).single("image"),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const data = await Comment.findById(id)
      if (data) {
        const modifiedComment = await Comment.findByIdAndUpdate(
          id,
          { image: req.file.path },
          {
            new: true,
          }
        )
        res.send(modifiedComment)
      } else {
        next(createError(404, `The comment with the id ${id} was not found!`))
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)
export default PostsRouter;