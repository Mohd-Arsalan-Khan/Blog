import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken"


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

    return res.status(200).json(new ApiResponse(200, newUser, "user is created"))
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
        _id: findUser._id,
    }, process.env.JWT_SECRET)

    const {password: pass, ...rest} = findUser._doc;

    res.status(200).cookie("access-token", token, {
        httpOnly: true
    }).json(new ApiResponse(200, rest, "User Logged In"))
    
})


export{
    signUp,
    signIn
}