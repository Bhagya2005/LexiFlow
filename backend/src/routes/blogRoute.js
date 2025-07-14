import { Router } from "express";
import generateBlog from '../controllers/BlogGen.js'
import auth from "../middlewares/auth.js";
const router = Router();
router.post('/generateblog',auth, generateBlog)
export default router
