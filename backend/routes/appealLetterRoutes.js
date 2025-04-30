import express from "express"
import { createAppealLetter, getAppealLetter, updateAppealLetter } from "../controllers/appealLetters.js";

const router = express.Router();

router.post('/create', createAppealLetter);
router.get('/get/:appealId', getAppealLetter);
router.put('/update/:fileId/:appealId', updateAppealLetter);

export default router