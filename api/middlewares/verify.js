import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/apiError.js'

const verifyToken = (req, res, next) =>{
    const token = req.cookies.access_token;
    
    if (!token) {
        throw new ApiError(401, "unauthorized")
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if (err) {

            throw new ApiError(401, "unauthorized")
        }
        req.user = user;
        next()
    })
}

export default verifyToken