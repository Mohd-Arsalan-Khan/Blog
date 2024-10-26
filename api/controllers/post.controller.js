import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const create = asyncHandler(async(req,res, next) =>{
    if (!req.user.isAdmin) {
        return new ApiError(403, "You are not allowed to create a post")
    }
    if (!req.body.title || !req.body.content) {
        return new ApiError(400, "please enter the required field")
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    })
    try {
        const savePost = await newPost.save()
        res.status(201).json(savePost)
    } catch (error) {
        next(error)
    }
})


export{
    create
}