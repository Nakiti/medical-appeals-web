import { db } from "../db.js";

export const createNotification = (req, res) => {
   const query = "INSERT INTO notifications (`user_id`, `appeal_id`, `title`, `text`, `date`) VALUES (?)"

   const values = [
      req.body.userId,
      Number(req.body.appealId),
      req.body.title,
      req.body.text,
      (new Date()).toISOString().slice(0, 19).replace('T', ' '),
   ]

   console.log(values)

   db.query(query, [values], (err, data) => {
      if (err) return console.log(err)
      return res.status(200).json(data)
   })
}

export const getNotificationByUserId = (req, res) => {
   const query = "SELECT * FROM notifications WHERE `user_id` = ?"

   const value = req.params.id

   db.query(query, [value], (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}

export const getNotificationsByAppealId = (req, res) => {
   const query = `
      SELECT notifications.*, appeals.internal_name
      FROM notifications 
      INNER JOIN appeals on notifications.appeal_id = appeals.id
      WHERE appeal_id = ?
   `

   const value = req.params.id

   db.query(query, [value], (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}