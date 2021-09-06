import mongoose from 'mongoose'

const {Schema, model} = mongoose

const postSchema = new Schema({
    text : {type:String, required:true},
    username: {type:String, required:true},
    image: {type:String, required:false},
    user : { type: Schema.Types.ObjectId, ref: "profile", required: true },
    Comments: [{
    comment: { type: String, required: true },
    }],
    likes: [{ type: Schema.Types.ObjectId}],
    }, {
        timestamps: true
    })

export default model("blogPost", postSchema) 