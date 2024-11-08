import Comment from "../models/comment.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createComment = asyncHandler(async(req,res,next) =>{

     try {
           const {content, postId, userId} = req.body
                      
           if (userId !== req.user.id) {
               return new ApiError(403, "you are not authorized")
           }
   
           const newComment = await Comment.create({
               content,
               postId,
               userId
           })
   
           if (!newComment) {
               return new ApiError(400, "comment not created")
           }
   
           res.status(200).json(newComment)
   
     } catch (error) {
        next(error)
     }
})

const getPostComment = asyncHandler(async(req,res,next) =>{
    try {
        const comments = await Comment.find({postId: req.params.postId}).sort({
            createdAt: -1
        })

        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
})

const likeComment = asyncHandler(async(req, res, next) =>{
    try {
        const comment = await Comment.findById(req.params.commentId)

        if (!comment) {
            return new ApiError(403,"No comment found")
        }

        const userIdex = comment.likes.indexOf(req.user.id)
        if (userIdex === -1) {
            comment.numbersOfLikes += 1;
            comment.likes.push(req.user.id)
        } else {
            comment.numbersOfLikes -= 1;
            comment.likes.splice(userIdex, 1)
        }

        await comment.save()

        res.status(200).json(comment)

    } catch (error) {
        next(error)
    }
})

const editComment = asyncHandler(async(req,res,next) =>{
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            return new ApiError(403, "comment not found")
        }

        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return new ApiError(400, "You are not allowed to edit this comment")
        }

        const editComment = await Comment.findByIdAndUpdate(req.params.commentId,{
            content: req.body.content
        },{new: true})

        res.status(200).json(editComment)
        
    } catch (error) {
        next(error)
    }
})

const deleteComment = asyncHandler(async(req,res,next) =>{
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            return new ApiError(403, "comment not found")
        }
        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return new ApiError(403, "You are not allowed to delete the comment")
        }
        await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).json("Comment has been deleted")
    } catch (error) {
        next(error)
    }
})


export{
    createComment,
    getPostComment,
    likeComment,
    editComment,
    deleteComment
}