const db = require("../dataBaseConfig.js");

exports.adminSaveData = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let value = [[email, password]];
  let sql = 'insert into admin(email, password) values ?'
  db.query(sql, [value], (err, result) => {
    if (err) throw err;
    else {
      res.send("Admin Data Saved");
    }
  });
};

exports.loginSaveData = (req, res)=>{
  let email = req.body.email
  let password = req.body.password
  let sql = 'select * from admin where email =? and password = ?'
  db.query(sql, [email, password], (err, result)=>{
    if(err) throw err
    else{
      if(result.length > 0){
        res.send(true)
      }else{
        res.send(false)
      }
    }
  })
}