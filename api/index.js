import express from "express";
import {app} from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

mongoose.connect(process.env.MONGODB_URL)
.then(() =>{
    console.log("mongoDB connected");
})
.catch((err) =>{
    console.log(err)
})


app.listen(3000, () => {
    console.log("server is running on port 3000...")
})