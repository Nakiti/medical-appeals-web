import express from "express"
import { createUser, getCurrentUser, login } from "../controllers/auth.js"

const router = express.Router()

router.post("/login", login)
router.post("/register", createUser)
router.get("/getCurrentUser", getCurrentUser)

export default router