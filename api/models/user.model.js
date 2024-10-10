import mongoose, {Schema} from "mongoose";  
import bcryptjs from "bcryptjs"

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
    },
    profilePicture:{
        type: String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
},{timestamps: true})

userModel.pre("save", async function(next){
    if(!this.isModified("password")) return next()

    this.password = bcryptjs.hashSync(this.password, 10);
    next()
})

userModel.methods.isPasswordCorrect = async function(password){
    return await bcryptjs.compare(password, this.password)
}

export const User = mongoose.model("User", userModel)