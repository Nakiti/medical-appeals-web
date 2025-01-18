import express from "express"
import { extractData } from "../controllers/gpt.js"

const router = express.Router()

router.post("/extractData", extractData)

export default router