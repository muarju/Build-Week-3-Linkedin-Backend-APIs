import mongoose from "mongoose"

const { Schema, model } = mongoose

const CommentSchema = new Schema(
  {
    comment: { type: String, required: true },
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "Profile", //MUSLIM SHOULD ADD PROFILE MODEL TO THE PROFILE SCHEMA TO MATCH
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post", //MUSLIM SHOULD ADD POST MODEL TO THE POST SCHEMA TO MATCH
      required: true,
    },
  },
  { timestamps: true }
)

export default model("Comment", CommentSchema)
