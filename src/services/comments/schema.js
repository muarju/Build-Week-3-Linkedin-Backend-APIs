import mongoose from "mongoose"

const { Schema, model } = mongoose

const CommentSchema = new Schema(
  {
    comment: { type: String, required: true },
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "profile", //MUSLIM SHOULD ADD PROFILE MODEL TO THE PROFILE SCHEMA TO MATCH
      required: true,
    }
  },
  { timestamps: true }
)

export default model("Comment", CommentSchema)
