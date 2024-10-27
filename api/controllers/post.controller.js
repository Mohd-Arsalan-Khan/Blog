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

const getPosts = asyncHandler(async(req, res, next) =>{
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && {userId : req.query.userId}),
            ...(req.query.category && {category : req.query.category}),
            ...(req.query.slug && {slug : req.query.slug}),
            ...(req.query.postId && {_id : req.query.postId}),
            ...(req.query.searchTerm && {
                $or:[
                    {title: {$regex: req.query.searchTerm, $options: 'i'}},
                    {content: {$regex: req.query.searchTerm, $options: 'i'}}
                ]
            })
        }).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit)

        const totalPosts = await Post.countDocuments()

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )

        const lastMonthPosts = await Post.countDocuments({
            createdAt:{$gte: oneMonthAgo}
        })

        res.status(200).json( new ApiResponse(200, {posts, totalPosts, lastMonthPosts},"all data fetched"))
    } catch (error) {
        next(error)
    }
})


export{
    create,
    getPosts
}