import mongoose, {Schema} from "mongoose";

const postModel = new Schema({
    userId:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: 'https://blog.apastyle.org/.a/6a01157041f4e3970b01b7c82eb758970b-320wi'
    },
    category:{
        type: String,
        default: 'uncategorized'
    },
    slug:{
        type: String,
        required: true,
        unique: true,
    }
},{timestamps: true})

export const Post = mongoose.model('Post', postModel)