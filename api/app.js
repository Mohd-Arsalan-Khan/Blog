import express from "express"


const app = express();

app.use(express.json({limit: "16kb"}))


import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"


app.use("/api/v1/user", userRouter)
app.use("/api/v1/registers", authRouter)


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