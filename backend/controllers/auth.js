import { db } from "../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { serialize } from "cookie";

export const login = (req, res) => {
   const query = "SELECT * FROM users WHERE email = ?";

   console.log(req.body)

   db.query(query, [req.body.email], (err, data) => {
      if (err) return res.status(500).json("Server error");
      if (data.length === 0) return res.status(404).json("User not found");
   
      const isPasswordCorrect = bcrypt.compareSync(
         req.body.password,
         data[0].password_hash 
      );
   
      if (!isPasswordCorrect) {
         return res.status(400).json("Password is incorrect");
      }

      const token = jwt.sign({id: data[0].id, userType: data[0].role}, "jwtkey")

      const cookie = serialize("session", token, {
         httpOnly: true,
         secure: true,
         maxAge: 60 * 60 * 24,
         path: "/"
      });

      res.setHeader("Set-Cookie", cookie)
      const {password, id, role, ...userData} = data[0]
      res.status(200).json({id: id, role: role});
   });
};

export const logout = (req, res) => {
   res.setHeader('Set-Cookie', 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; HttpOnly;');
   res.status(200).json({ message: 'Logged out' });
   console.log("ayo")
}

export const createUser = (req, res) => {
   const q = "SELECT * FROM users WHERE email = ?"

   db.query(q, req.body.email, (err, data) => {
      if (err) return res.status(500).json(err)
      if (data.length > 0) {return res.status(409).json("Email already in use")}
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const query = "INSERT INTO users (`first_name`, `last_name`, `email`, `role`, `password_hash`, `created_at`) VALUES (?)"
      const values = [
         req.body.firstName,
         req.body.lastName,
         req.body.email,
         "admin",
         hash,
         (new Date()).toISOString().slice(0, 19).replace('T', ' '),
      ]
  
      db.query(query, [values], (err, data) => {
         if (err) return console.log(err)
         return res.status(200).json(data.insertId)
      })
   })
}

export const getCurrentUser = (req, res) => {
   const token = req.cookies.session
   console.log("token \n", req.cookies.session, "\n")

   if (!token) return res.status(401).json("Not authenticated");

   jwt.verify(token, "jwtkey", (err, data) => {
      if (err) return res.status(403).json("Token is not Valid")
      
      res.status(200).json({id: data.id})
   })
}