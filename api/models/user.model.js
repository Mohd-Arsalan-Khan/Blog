import mongoose, {Schema} from "mongoose";  

const userModel = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:[true, "password is required"]
    }
},{timestamps: true})

export const User = mongoose.model("User", userModel)