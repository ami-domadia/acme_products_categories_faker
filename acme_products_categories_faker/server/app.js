const {syncAndSeed, Category, Product, createCat, createProduct} = require('./db.js')
const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

const morgan = require('morgan')

app.use(morgan('dev'))

//app.get('/app.js', (req, res, next)=>res.sendFile(path.join(__dirname, 'public', 'bundle.js')))
app.use(express.static(path.join(__dirname,'public')))

app.get('/api/categories', (req, res, next)=>{
    // if(req.params.id){
    //     Category.findOne({where: {id: req.params.id*1}, include: {model: Product}})
    //     .then((found)=>res.send(found))
    // }

    Category.findAll({include: {model: Product}})
    .then((content)=>{
        return res.send(content)
    })
    .catch((err)=>{
        console.log(err)
        res.sendStatus(500)
        next(err)
    })    
})

app.post('/category', (req, res, next)=>{
    
    if(createCat())
        res.sendStatus(201)
    else 
        res.sendStatus(500)
})

app.post('/product/:catid', (req, res, next)=>{
    
    if(createProduct(req.params.catid*1))
        res.sendStatus(201)
    else 
        res.sendStatus(500)
})

app.delete('/category/:id', (req, res, next)=>{
    Category.destroy({where: {id: req.params.id*1}})
    .then(()=>res.sendStatus(204))
    .catch(next) 
})

app.delete('/product/:id', (req, res, next)=>{
    Product.destroy({where: {id: req.params.id*1}})
    .then(()=>res.sendStatus(204))
    .catch(next) 
})

syncAndSeed()
.then(()=>app.listen(port, ()=>console.log('Listening on port', port)))
.catch((err)=> console.log(err))