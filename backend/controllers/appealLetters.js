import { db } from "../db.js";

export const createAppealLetter = (req, res) => {
   const query = "INSERT INTO appeal_letters (`appeal_id`, `file_id`) VALUES(?)"

   const values = [
      req.body.appealId,
      req.body.fileId
   ]

   db.query(query, [values], (err, data) => {
      if (err) return res.json(data)
      return res.status(200).json(data)
   })
}

export const getAppealLetter = (req, res) => {
   const query = `
      SELECT appeal_letters.*, files.file_name, files.file_type, files.blob_url, files.blob_name
      FROM appeal_letters
      INNER JOIN files ON files.id = appeal_letters.file_id
      WHERE appeal_letters.appeal_id = ?
   `

   const values = [req.params.appealId]

   db.query(query, values, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}

export const updateAppealLetter = (req, res) => {
   const query = "UPDATE appeal_letters SET `file_id` = ? WHERE `appeal_id` = ?"

   const values = [
      req.params.fileId,
      req.params.appealId
   ]


   db.query(query, values, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}