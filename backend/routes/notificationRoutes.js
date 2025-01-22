import express from "express"
import { createNotification, getNotificationByUserId, getNotificationsByAppealId } from "../controllers/notifications.js"

const router = express.Router()

router.post("/create", createNotification)
router.get("/getByUser/:id", getNotificationByUserId)
router.get("/getByAppeal/:id", getNotificationsByAppealId)

export default router