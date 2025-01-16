import express from "express"
import { createAppeal, deleteDrafts, getAppeal, getAppealsByUser, getAppealSearch, getDrafts, getSubmittedAppeals, updateAppeal } from "../controllers/appeals.js"

const router = express.Router()

router.post("/create", createAppeal)
router.get("/get/:id", getAppeal)
router.put("/update/:id", updateAppeal)
router.get("/getByUser/:id", getAppealsByUser)
router.get("/getSubmitted/:id", getSubmittedAppeals)
router.get("/getDrafts/:id", getDrafts)
router.delete("/deleteDrafts", deleteDrafts)
router.get("/getAppealSearch/:submitted/:userid", getAppealSearch)

export default router