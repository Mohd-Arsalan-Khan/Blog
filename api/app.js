import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express();

app.use(cors());

app.use(express.json({limit: "16kb"}))
app.use(cookieParser())


import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"


app.use("/api/v1/user", userRouter)
app.use("/api/v1/register", authRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/comment", commentRouter)


app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})
export {app}