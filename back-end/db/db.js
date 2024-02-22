import mysql2 from "mysql2"

const pool=  mysql2.createPool({
    host:"localhost",
    user:"root",
    password:"milena.777",
    database:"online_shop_nodejs",
})
module.exports = pool