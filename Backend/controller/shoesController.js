const db = require('../dataBaseConfig.js')

exports.saveData = (req, res)=>{
    let shoesBrand = req.body.shoesBrand
    let shoesRating = req.body.shoesRating
    let shoesPrice = req.body.shoesPrice
    let shoesCategory = req.body.shoesCategory
    let shoesImage = req.file.filename
    let value = [[shoesBrand, shoesRating, shoesPrice,shoesCategory, shoesImage]]
    let sql = 'insert into shoes(shoesBrand, shoesRating, shoesPrice,shoesCategory, shoesImage) values?'
    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.send("Shoes Saved")
        }
    })
}


exports.getData = (req, res)=>{
    let sql = 'select * from shoes'
    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.getDataByBrand = (req, res)=>{
    let inp = req.params.inp
    let sql = 'select * from shoes where shoesBrand like ?'
    db.query(sql,["%" + inp + "%"], (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.getDataById = (req, res)=>{
    let id = req.params.id
    let sql = 'select * from shoes where id =?'
    db.query(sql,[id], (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}



exports.deleteData = (req, res)=>{
    let id = req.params.id
    let sql = 'delete from shoes where id = ?'
    db.query(sql, [id], (err, result)=>{
        if(err) throw err
        else{
            res.send("Data Deleted")
        }
    })
}

exports.updateData = (req, res)=>{
    let id = req.params.id
    let newData = req.body
    let sql = 'update shoes set? where id = ?'
    db.query(sql, [newData, id], (err, result)=>{
        if(err) throw err
        else{
            res.send('Data Updated')
        }
    })
}