import mongoose, {Schema} from "mongoose";

const commentModal = new Schema({
    content:{
        type: String,
        required: true
    },
    postId:{
        type: String, 
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    likes:{
        type: Array,
        default:[]
    },
    numbersOfLikes:{
        type: Number,
        default: 0
    }

},{timestamps: true})

const Comment = mongoose.model('Comment', commentModal)

export default Comment;