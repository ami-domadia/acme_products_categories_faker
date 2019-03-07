const Sequelize = require('sequelize')
const faker = require('faker')
const DATABASE_URL = process.env.DATABASE_URL

const orm = new Sequelize(DATABASE_URL, {logging: false})

/*
Category
    Product
    A category can have many products
*/

const Category = orm.define('category', {
    name: Sequelize.STRING
})

const Product = orm.define('product', {
    name: Sequelize.STRING
})

Product.belongsTo(Category)
Category.hasMany(Product)

const productNames = function(count=5){
    let products = []
    
    while(products.length<count){
        products.push({name: faker.commerce.productName()})
    }
    return products
}

const categoryNames = function(count=5){
    let categories = []
    
    while(categories.length<count){
        categories.push({name: faker.commerce.department()})
    }
    return categories
}

const syncAndSeed = function(){
    let products = []
    let categories = []
    return orm.sync({force: true})
    .then(()=>categoryNames())
    .then((cNames)=> Promise.all(cNames.map(name=>Category.create(name))))
    .then((cats)=>categories=cats)
    .then(()=> productNames())
    .then((pNames)=> 
        Promise.all(pNames.map(name=>Product.create(name))))
    .then((prods)=> products = prods)
    .then(()=>{
        
        for(let i = 0; i < products.length; i++){
            products[i].setCategory(categories[i])
           
        }
        console.log('seeding')
        return ;
    })
    .catch((err)=>console.log(err))
}

const createCat = function(){
    return Category.create({name: faker.commerce.department()})
    .then((category)=>{
        //console.log(category)
        return category
    })
    .catch((err)=>console.log('Error creating new category'))
}

const createProduct = function(catid){
    let cat = {}
    let prod = {}
    return Product.create({name: faker.commerce.productName()})
    .then((product)=>{
        prod = product
        return Category.findOne({where: {id: catid}})
    })
    .then((category)=>prod.setCategory(category))
    .catch((err)=>console.log('Error creating new product'))
}

module.exports = {syncAndSeed, Category, Product, createCat, createProduct}