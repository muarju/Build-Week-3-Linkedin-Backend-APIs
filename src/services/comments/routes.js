import express from "express"
import createError from "http-errors"
import comments from "./schema.js"

const commentsRouter = express.Router()

commentsRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})
commentsRouter.get("/:_id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})

commentsRouter.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})
commentsRouter.put("/:_id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})
commentsRouter.delete("/:_id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})
export default commentsRouter
