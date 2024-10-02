import { Router} from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";



const router = Router();


router.route("/").post(signUp)
router.route("/signin").post(signIn)



export default router