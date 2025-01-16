import express from "express"
import { getUser } from "../controllers/users.js"

const router = express.Router()

router.get("/get/:id", getUser)


export default router