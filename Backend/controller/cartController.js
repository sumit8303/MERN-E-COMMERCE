const db = require('../dataBaseConfig.js')

exports.cartData = (req, res)=>{    
    let shoesBrand = req.body.shoesBrand
    let shoesRating = req.body.shoesRating
    let shoesPrice = req.body.shoesPrice
    let shoesImage = req.body.shoesImage
    let username = req.params.username
    let value = [[shoesBrand, shoesRating, shoesPrice, shoesImage]]
    let sql = `insert into ${username}(shoesBrand, shoesRating, shoesPrice, shoesImage) values?`
    db.query(sql, [value], (err, result )=>{
        if(err) throw err
        else{
            res.send("Product saved")
        }
    })
}



exports.getCart = (req, res)=>{
    let username = req.params.username
    let sql  =  `select * from ${username}`
    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}


exports.deleteCart = (req, res)=>{
    let id = req.params.id
    let username = req.params.username
    let sql = `delete from $ where id = ?`
    db.query(sql, [id], (err, result)=>{
        if(err) throw err
        else{
            res.send('Cart Deleted')
        }
    })
}