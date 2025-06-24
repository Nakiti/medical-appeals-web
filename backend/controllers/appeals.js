import { db } from "../db.js";

export const createAppeal = (req, res) => {
   const query = "INSERT INTO appeals (`user_id`, `appeal_deadline`, `first_name`, `last_name`, `claim_number`, `ssn`, `dob`, `insurance_provider`, `insurance_address`, `physician_name`, `physician_address`, `physician_phone`, `physician_email`, `policy_number`, `procedure_name`, `denial_reason`, `additional_details`, `supporting_documents`, `date_filed`, `submitted`, `status`, `created_at`, `updated_at`, `appealer_first_name`, `appealer_last_name`, `appealer_address`, `appealer_email_address`, `appealer_phone_number`, `appealer_relation`) VALUES (?)"

   const values = [
      req.body.userId,
      req.body.appealDeadline,
      req.body.firstName,
      req.body.lastName,
      req.body.claimNumber,
      req.body.ssn,
      req.body.dob,
      req.body.insuranceProvider,
      req.body.insuranceAddress,
      req.body.physicianName,
      req.body.physicianAddress,
      req.body.physicianPhone,
      req.body.physicianEmail,
      req.body.policyNumber,
      req.body.procedureName,
      req.body.denialReason,
      req.body.additionalDetails,
      req.body.supportingDocuments,
      req.body.dateFiled,
      req.body.submitted,
      req.body.status,
      (new Date()).toISOString().slice(0, 19).replace('T', ' '),
      (new Date()).toISOString().slice(0, 19).replace('T', ' '),
      req.body.appealerFirstName,
      req.body.appealerLastName,
      req.body.appealerAddress,
      req.body.appealerEmailAddress,
      req.body.appealerPhoneNumber,
      req.body.appealerRelation
   ]

   console.log("values: ", values)

   db.query(query, [values], (err, data) => {
      console.log(err)
      if (err) return res.json(err)
      return res.status(200).json(data.insertId)
   })
} 

export const updateAppeal = (req, res) => {
   const query = "UPDATE appeals SET `first_name` = ?, `last_name` = ?, `ssn` = ?, `dob` = ?, `insurance_provider` = ?, `insurance_address` = ?, `physician_name` = ?, `physician_address` = ?, `physician_phone` = ?, `physician_email` = ?, `policy_number` = ?, `procedure_name` = ?, `denial_reason` = ?, `additional_details` = ?, `supporting_documents` = ?, `date_filed` = ?, `submitted` = ?, `status` = ?, `updated_at` = ?, `appealer_first_name` = ?, `appealer_last_name` = ?, `appealer_address` = ?, `appealer_email_address` = ?, `appealer_phone_number` = ?, `appealer_relation` = ? WHERE `id` = ?"
 
   const values = [
      req.body.firstName,
      req.body.lastName, 
      req.body.ssn,
      req.body.dob,
      req.body.insuranceProvider,
      req.body.insuranceAddress,
      req.body.physicianName,
      req.body.physicianPhone,
      req.body.physicianAddress,
      req.body.physicianEmail,
      req.body.policyNumber,
      req.body.procedureName,
      req.body.denialReason,
      req.body.additionalDetails,
      req.body.supportingDocuments,
      req.body.dateFiled,
      req.body.submitted,
      req.body.status,
      (new Date()).toISOString().slice(0, 19).replace('T', ' '),
      req.body.appealerFirstName,
      req.body.appealerLastName,
      req.body.appealerAddress,
      req.body.appealerEmailAddress,
      req.body.appealerPhoneNumber,
      req.body.appealerRelation,
      req.params.id
   ]

   console.log("values ", values)

   db.query(query, values, (err, data) => {
      if (err) return console.log(err)
      return res.status(200).json(data)
   })
}

export const checkClaimNumber = (req, res) => {
   const query = "SELECT * FROM appeals WHERE `claim_number` = ?"

   const value = [req.query.claimNumber]

   console.log(value)

   db.query(query, value, (err, data) => {
      if (err) return res.json(err)
      console.log(data)
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

export const getAllSubmittedAppeals = (req, res) => {
   const query = `
      SELECT appeals.*, users.first_name, users.last_name, users.email 
      FROM appeals
      INNER JOIN users on appeals.user_id = users.id
      WHERE appeals.submitted = 1
   `

   console.log(query)

   db.query(query, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}