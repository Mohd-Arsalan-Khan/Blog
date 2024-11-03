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


export{
    createComment
}