const express = require('express')
const db = require('./dataBaseConfig.js')
const shoesRouter = require('./route/shoesRoute.js')
const adminRouter = require('./route/adminRoute.js')
const cartRouter = require('./route/cartRoute.js')
const clientRouter = require('./route/clientRoute.js')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config({
    path:'./.env'
})

let app = express()
app.use(express.json())
app.use(cors())
// app.set('view Engine', 'ejs')
app.use(express.static('uploads'))
app.use(express.static('public'))

let hostName = '127.0.0.1'

db.connect((err)=>{
    if(err) throw err
    else{
        console.log("Database Connected")
    }
})

let userTableQuery = `
CREATE TABLE IF NOT EXISTS shoes(
    id INT NOT NULL AUTO_INCREMENT,
    shoesBrand VARCHAR(255) NULL,
    shoesRating VARCHAR(255) NULL,
    shoesPrice VARCHAR(255) NULL,
    PRIMARY KEY(id)
);`

db.query(userTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("Shoes table is created")
    }
})

let adminTableQuery = `
CREATE TABLE IF NOT EXISTS admin(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    PRIMARY KEY(id)
);`

db.query(adminTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("Admin table is created")
    }
})


let cartTableQuery = `
CREATE TABLE IF NOT EXISTS cart(
    id INT NOT NULL AUTO_INCREMENT,
    shoesBrand VARCHAR(255) NULL,
    shoesRating VARCHAR(255) NULL,
    shoesPrice VARCHAR(255) NULL,
    shoesImage VARCHAR(255) NULL,
    PRIMARY KEY(id)
);`

db.query(cartTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("cart table is created")
    }
})
let clientTableQuery = `
CREATE TABLE IF NOT EXISTS client(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    image VARCHAR(255) NULL,
    PRIMARY KEY(id)
);`

db.query(clientTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("Client table is created")
    }
})

app.listen(process.env.PORT, hostName, ()=>{
    console.log(`Server is running at http://${hostName}:${process.env.PORT}/api/`)
})


app.use('/api', shoesRouter)

app.use('/api', adminRouter)

app.use('/api', cartRouter)

app.use('/api', clientRouter)