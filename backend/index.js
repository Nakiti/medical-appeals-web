import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
import appealRoutes from "./routes/appealRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { db } from "./db.js";

const app = express()



const corsOptions = {
   origin: true,
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true, // Enable credentials (cookies, etc.)
};

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use("/api/user", userRoutes)
app.use("/api/appeal", appealRoutes)
app.use("/api/auth", authRoutes)


app.get("/", (req, res) => {
   res.send("its running!")
})

const port = 4001

app.listen(port, (req, res) => {
   console.log("runninnnnnnnnnnnn")
   db.getConnection((err, connection) => {
      if (err) {
         console.error("Error connecting to the database:", err);
      } else {
         console.log("Database connected successfully!");
         connection.release(); // Release the connection back to the pool
      }
   });
})