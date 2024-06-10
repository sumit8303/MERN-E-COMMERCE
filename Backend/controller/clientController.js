const db = require('../dataBaseConfig.js')
const bcrypt = require('bcryptjs')

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
          bcrypt.compare(password, result[0].password, (err, isMatch)=>{

            res.send(isMatch)
          })
        }else{
          res.send(false)
        }
      }
    })
  }catch(err) {
    console.log(error)

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
  let sql = "select * from client where username = ?"

  db.query(sql, [username], (err, result)=>{
      if(err) throw err
      else{
          res.json(result)
      }
  })

}