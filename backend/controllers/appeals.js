import { db } from "../db.js";

export const createAppeal = (req, res) => {
   const query = "INSERT INTO appeals (`user_id`, `internal_name`, `submitted`, `created_at`, `updated_at`) VALUES (?)"

   const values = [
      req.body.userId,
      req.body.internalName,
      0,
      (new Date()).toISOString().slice(0, 19).replace('T', ' '),
      (new Date()).toISOString().slice(0, 19).replace('T', ' ')
   ]


   db.query(query, [values], (err, data) => {
      console.log(err)
      if (err) return res.json(err)
      return res.status(200).json(data.insertId)
   })
} 

export const updateAppeal = (req, res) => {
   const query = "UPDATE appeals SET `first_name` = ?, `last_name` = ?, `claim_number` = ?, `ssn` = ?, `dob` = ?, `insurance_provider` = ?, `policy_number` = ?, `procedure_name` = ?, `denial_reason` = ?, `additional_details` = ?, `supporting_documents` = ?, `date_filed` = ?, `submitted` = ?, `status` = ?, `updated_at` = ? WHERE `id` = ?"

   console.log((req.body.supportingDocuments))

   const values = [
      req.body.firstName,
      req.body.lastName, 
      req.body.claimNumber,
      req.body.ssn,
      req.body.dob,
      req.body.insuranceProvider,
      req.body.policyNumber,
      req.body.procedureName,
      req.body.denialReason,
      req.body.additionalDetails,
      req.body.supportingDocuments,
      req.body.dateFiled,
      req.body.submitted,
      req.body.status,
      (new Date()).toISOString().slice(0, 19).replace('T', ' '),
      req.params.id
   ]

   console.log(values)

   db.query(query, values, (err, data) => {
      if (err) return console.log(err)
      return res.status(200).json(data)
   })
}

export const getAppeal = (req, res) => {
   const query = "SELECT * FROM appeals WHERE `id` = ?"

   const values = req.params.id
   console.log(values)

   db.query(query, [values], (err, data) => {
      if (err) return res.json(data)
      return res.status(200).json(data)
   })
}

export const getAppealsByUser = (req, res) => {
   const query = "SELECT * FROM appeals WHERE `user_id` = ? ORDER BY id DESC"

   const values = req.params.id
   
   db.query(query, [values], (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}

export const getSubmittedAppeals = (req, res) => {
   const query = "SELECT * FROM appeals WHERE `user_id` = ? AND `submitted` = ? ORDER BY id DESC"

   const values = [
      req.params.id,
      1
   ]

   db.query(query, values, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}

export const getDrafts = (req, res) => {
   const query = "SELECT * FROM appeals WHERE `user_id` = ? AND `submitted` = ? ORDER BY id DESC"

   const values = [
      req.params.id,
      0
   ]
   db.query(query, values, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}

export const deleteDrafts = (req, res) => {
   const query = "DELETE FROM appeals WHERE `id` in (?) AND `submitted` = 0"

   const values = req.body.map(item => item.id)

   db.query(query, [values], (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}

export const getAppealSearch = (req, res) => {
   const query = `
      SELECT *
      FROM appeals
      WHERE (internal_name LIKE ? OR claim_number LIKE ?) AND submitted = ? AND user_id = ?
   `
   const values = [
      `%${req.query.q}%`,
      `%${req.query.q}%`,
      req.params.submitted,
      req.params.userid
   ]

   db.query(query, values, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}

export const getAppealsSearchAdmin = (req, res) => {
   const query = `
      SELECT appeals.*, users.first_name, users.last_name, users.email, users.id AS user_id
      FROM appeals
      INNER JOIN users on appeals.user_id = users.id
      WHERE (appeals.internal_name LIKE ? OR appeals.claim_number LIKE ? OR users.first_name LIKE ? OR users.last_name LIKE ?)
   `
   const values = [
      `%${req.query.q}%`,
      `%${req.query.q}%`,
      `%${req.query.q}%`,
      `%${req.query.q}%`,
   ]

   db.query(query, values, (err, data) => {
      if (err) return console.log(err)
      return res.status(200).json(data)
   })
}

export const getAllAppeals = (req, res) => {
   const query = `
      SELECT appeals.*, users.first_name, users.last_name, users.email 
      FROM appeals
      INNER JOIN users on appeals.user_id = users.id
   `

   db.query(query, (err, data) => {
      if (err) res.json(err)
      return res.status(200).json(data)
   })
}