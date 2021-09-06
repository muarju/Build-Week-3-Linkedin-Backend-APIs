import mongoose from "mongoose"

const { Schema, model } = mongoose

const CommentSchema = new Schema(
  {
    comment: { type: String, required: true },
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "profile",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "blogPost",
      required: true,
    },
  },
  { timestamps: true }
)

export default model("Comment", CommentSchema)
