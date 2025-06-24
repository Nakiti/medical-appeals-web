import express from "express"
import { createBatchFiles, createFile, deleteFiles, getFilesByAppeal, updateFile } from "../controllers/files.js"

const router = express.Router()

router.post("/create", createFile)
router.get("/get/:id", getFilesByAppeal)
router.post("/createBatch", createBatchFiles)
router.put("/update/:fileId", updateFile)
router.delete("/delete", deleteFiles)

export default router