import express from "express"
import createError from "http-errors"
import Comment from "./schema.js"
import multer from "multer"
import { mediaStorage } from "../../tools/saveImageCloudinary.js"

const commentsRouter = express.Router()

commentsRouter.get("/", async (req, res, next) => {
  try {
    const comment = await Comment.find({}).populate("user")
    res.send(comment)
  } catch (error) {
    next(error)
  }
})
commentsRouter.get("/:_id", async (req, res, next) => {
  try {
    const commentId = req.params._id
    const comment = await Comment.findById(commentId).populate("user")
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

commentsRouter.post("/", async (req, res, next) => {
  try {
    const newComment = new Comment(req.body)
    const comment = await newComment.save()
    res.status(201).send(comment)
  } catch (error) {
    next(error)
  }
})
commentsRouter.put("/:_id", async (req, res, next) => {
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
commentsRouter.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params
    const deletedComment = await Comment.findByIdAndDelete(req.params._id)
    if (deletedComment) {
      res
        .status(200)
        .send(`The comment with the id ${_id} was successfully deleted `)
    } else {
      next(createError(404, `The comment with the id ${_id} was not found!`))
    }
  } catch (error) {
    next(error)
  }
})

commentsRouter.put(
  "/:id/image",
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
export default commentsRouter
