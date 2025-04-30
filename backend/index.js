import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
import appealRoutes from "./routes/appealRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { db } from "./db.js";
import gptRoutes from "./routes/gptRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js"
import fileRoutes from "./routes/fileRoutes.js"
import appealLetterRoutes from "./routes/appealLetterRoutes.js"

const app = express()

const corsOptions = {
   origin: ["https://icy-hill-05965451e.4.azurestaticapps.net", "http://localhost:3000"],
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true, 
}; 

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use("/api/user", userRoutes)
app.use("/api/appeal", appealRoutes)
app.use("/api/auth", authRoutes) 
app.use("/api/gpt", gptRoutes)
app.use("/api/notifications", notificationRoutes)
app.use("/api/files", fileRoutes)
app.use("/api/appealLetter", appealLetterRoutes)

app.use((req, res, next) => {
   console.log(`Incoming request: ${req.method} ${req.url}`);
   next();
});


app.get("/", (req, res) => {
   res.send("its running!")
})

const port = 8080

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