import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs";


const signUp = asyncHandler(async(req, res) =>{
    const {username, email, password} = req.body

    if (!username && !email && !password) {
        throw new ApiError(400, "all field is required")
    }

    const exsistedUser = await User.findOne({
        $or:[{username},{email}]
    })

    if (exsistedUser) {
        throw new ApiError(409, "Already resigtered")
    }

    const newUser = await User.create({
        username,
        password,
        email
    })

    if (!newUser) {
        throw new ApiError(400, "user is not registered")
    }

    res.status(200).json("SignUp sucessfully")
})

const signIn = asyncHandler(async(req, res) =>{
    const {email, password} = req.body

    if (!email && !password) {
        throw new ApiError(400, "all filed are required")
    }

    const findUser = await User.findOne({
        email
    })

    if (!findUser) {
        throw new ApiError(404, "user not exsist")
    }

    const isPasswordValid = await findUser.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(404, "Enter the correct password")
    }

    const token = jwt.sign({
        id: findUser._id, isAdmin: findUser.isAdmin
    }, process.env.JWT_SECRET)

    const {password: pass, ...rest} = findUser._doc;

    res.status(200).cookie("access_token", token, {
        httpOnly: true
    }).json(rest)
    
})

const google = asyncHandler(async(req,res) =>{
    const {email, name, googlePhotoUrl} = req.body

    try {
        const user = await User.findOne({email})
        if (user) {
            // return new ApiError(400, "user already exsisted please sign in")
            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET)
            const {password, ...rest} = user._doc;
            res.status(200).cookie("access_token", token,{httpOnly:true}).json(rest)
        }else{
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword =  bcryptjs.hashSync(generatePassword, 10);
            const newUser = await User.create({
                username : name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
                email,
                password: hashPassword,
                profilePicture: googlePhotoUrl
            })
            const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET)
            const {password, ...rest} = newUser._doc;
            res.status(200).cookie("access_token", token,{httpOnly:true}).json(rest)
        }
        
    } catch (error) {
        throw res.status(500).json({ message: "Internal server error" });
    }

})

export{
    signUp,
    signIn,
    google,
}