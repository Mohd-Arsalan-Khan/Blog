import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import bcryptjs from 'bcryptjs'

export const test = (req,res) =>{
    res.json("working wells")
}


const updateUser = asyncHandler(async(req, res, next) =>{
   let {password, username, email, profilePicture} = req.body
   const {userId} =  req.params

   if (!userId) {
     throw new ApiError(403, "User Id is not valid")
   }
   if (req.user._id !== userId) {
     throw new ApiError(403, "unauthorized")
   }

   if (password) {
     if (password.length < 6) {
        throw new  ApiError(400, "password must be least 6 characters")
     }
     password = bcryptjs.hashSync(password, 10)
   }
   if (username) {
        if (username.length < 7 || username.length > 20) {
            throw new ApiError(400, "username must be between 7 to 20 characters")
        }
        if (username.includes(" ")) {
            throw new ApiError(400, "username cannot contain space")
        }
        if (username !== username.toLowerCase()) {
            throw new ApiError(400, "username must be lowercase")
        }
        if (!username.match(/^[a-zA-Z0-9]+$/)) {
            throw new ApiError(400, "username can only contain letters and numbers")
        }
   }
    const updatedUser = await User.findByIdAndUpdate(userId,{
        $set:{
            username,
            password,
            email,
            profilePicture,
        }
    }, {new : true});
    const {password: _, ...rest} = updatedUser._doc
    if (!updateUser) {
        throw new ApiError(400, "updation faild")
    }
    res.status(200).json(new ApiResponse(200, rest, "user details updated sucessfully"))
    
})

export{
    updateUser
}