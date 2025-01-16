import mysql from "mysql2"

let config = {
   host: "appeals-mysql.mysql.database.azure.com",
   user: "nakiti",
   password: "password$1",
   database: "insurance_appeals",
   port: 3306,
   ssl: {
      rejectUnauthorized: true, 
   },
}

export const db = new mysql.createPool(config)
