import express from "express"
import { checkClaimNumber, createAppeal, deleteDrafts, getAllAppeals, getAllSubmittedAppeals, getAppeal, getAppealsByUser, getAppealSearch, getAppealsSearchAdmin, getDrafts, getSubmittedAppeals, updateAppeal } from "../controllers/appeals.js"

const router = express.Router()

router.post("/create", createAppeal)
router.get("/get/:id", getAppeal)
router.put("/update/:id", updateAppeal)
router.get("/getByUser/:id", getAppealsByUser)
router.get("/getSubmitted/:id", getSubmittedAppeals)
router.get("/getDrafts/:id", getDrafts)
router.delete("/deleteDrafts", deleteDrafts)
router.get("/getAppealSearch/:submitted/:userid", getAppealSearch)
router.get("/getAllAppeals", getAllAppeals)
router.get("/admin/search", getAppealsSearchAdmin)
router.get("/getAllSubmitted", getAllSubmittedAppeals)
router.get("/checkClaimNumber", checkClaimNumber)

export default router