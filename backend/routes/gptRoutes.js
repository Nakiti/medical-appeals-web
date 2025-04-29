import express from "express"
import { extractData, writeAppealLetter } from "../controllers/gpt.js"

const router = express.Router()

router.post("/extractData", extractData)
router.post("/writeLetter", writeAppealLetter)

export default router