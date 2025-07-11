import express from "express"
import { chat, extractData, getUsageStats, writeAppealLetter } from "../controllers/gpt.js"
import { checkUsageLimit } from "../ratelimiter.js"
import { authenticate } from "../authenticate.js"

const router = express.Router()

router.post("/extractData", authenticate, checkUsageLimit('parse'), extractData)
router.post("/writeLetter", authenticate, checkUsageLimit('letter'), writeAppealLetter)
router.post("/chat", authenticate, checkUsageLimit('chat'), chat)
router.get("/usage", authenticate, getUsageStats)

export default router