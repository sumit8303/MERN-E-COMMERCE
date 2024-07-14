const db = require('../dataBaseConfig.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function generateToken(user){ 
  return jwt.sign({id: user.id}, process.env.JWT_secret, {expiresIn: '3h'})
}

exports.clientSaveData =async (req, res)=>{
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let hashPassword = await bcrypt.hash(password, 10)
    let image = req.file.filename
    let value = [[ username, email, hashPassword, image]]
    let sql= 'insert into client ( username, email, password, image) values?'
    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.send('Client Data Saved')
        }
    })
}  

exports.loginclientData = (req, res)=>{
try{
    let username = req.body.username
    let password = req.body.password
    let sql = 'select * from client where username =?'
    db.query(sql, [username], (err, result)=>{
      if(err) throw err
      else{
        if(result.length > 0){
          bcrypt.compare(password, result[0].password,  async (err, isMatch)=>{
            let token = await generateToken(result[0])
            res.send({token, isMatch})
          })
        }else{
          res.send(false)
        }
      }
    })
  }catch(err) {
    console.log(err)

  }
}

exports.createClient = (req,res)=>{
  let username = req.params.username
  let clientTableQuery = `
  CREATE TABLE IF NOT EXISTS ${username}(
    id INT NOT NULL AUTO_INCREMENT,
    shoesBrand VARCHAR(255) NULL,
    shoesRating VARCHAR(255) NULL,
    shoesPrice VARCHAR(255) NULL,
    shoesImage VARCHAR(255) NULL,
    PRIMARY KEY (id));`
    db.query(clientTableQuery, (err , result)=>{
      if(err) throw err
      else{
        console.log("Cart table is created")
      }
    })
}


exports.getClient = (req, res)=>{
  let username = req.params.username
  let sql = "select * from client where id = ?"

  db.query(sql, [username], (err, result)=>{
      if(err) throw err
      else{
          res.json(result)
      }
  })

}

exports.profile = (req, res)=>{ 
  let token = req.headers['authorization'].split(' ')[1]
  if(token){
    jwt.verify(token, process.env.JWT_secret, (err, decode)=>{
      if(err) throw err
      else{
        db.query("select * from client where id = ?", [decode.id], (err, result)=>{
          if(err) throw err
          else{
            res.json(result[0])
          }
        })
      }
    })
  }
}