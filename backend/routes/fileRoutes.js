import express from "express"
import { createBatchFiles, createFile, getFilesByAppeal } from "../controllers/files.js"

const router = express.Router()

router.post("/create", createFile)
router.get("/get/:id", getFilesByAppeal)
router.post("/createBatch", createBatchFiles)

export default router