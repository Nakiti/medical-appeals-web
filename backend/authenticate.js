import jwt from "jsonwebtoken"
import 'dotenv/config'

export const authenticate = (req, res, next) => {
   const token = req.cookies.session;

   if (!token) {
      return res.status(401).json({ error: 'Not authenticated. Please log in.' });
   }


   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
         return res.status(403).json({ error: 'Token is not valid.' });
      }

      req.user = user;

      next();
   });
}