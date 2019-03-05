const orm = require('./db.js')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const morgan = require('morgan')

app.use(morgan('dev'))

app.get('/', (req, res, next)=>{
    orm.Category.findAll({where: {include: {model: orm.Product}}})
    .then((content)=>{
        //console.log(content)
        return res.send(content)
    })
    .catch((err)=>{
        console.log(err)
        res.sendStatus(500)
        next(err)
    })    
})


orm.syncAndSeed()
.then(()=>app.listen(port, ()=>console.log('Listening on port', port)))
.catch((err)=> console.log(err))