import React, {Component} from 'react'
import axios from 'axios'
import List from './List.js'

export default class App extends Component{
    constructor(){
        super()
        this.state = {
            categories: []
        }
        this.create = this.create.bind(this)
        this.destroy = this.destroy.bind(this)
        this.createProduct = this.createProduct.bind(this)
        this.destroyProduct = this.destroyProduct.bind(this)
    }

    create(){
        axios.post('/api/categories')
        .then(response=>response.data)
        .then(()=>axios.get('/api/categories'))
        .then(response=>response.data)
        .then(categories=>{
            this.setState({categories})
            console.log(categories)
        })
        .catch((error)=>console.log(error))
    }

    createProduct(catid){
        axios.post(`/api/products/${catid}`)
        .then(()=>axios.get('/api/categories'))
        .then(response=>response.data)
        .then(categories=>{
            this.setState({categories})
            console.log(categories)
        })
        .catch((error)=>console.log(error))
    }

    destroyProduct(productid){
        axios.delete(`/api/products/${productid}`)
        .then((response)=>console.log('hey i want to delete product', response.data))
        .then(()=>axios.get('/api/categories'))
        .then(response=>response.data)
        .then(categories=>{
            this.setState({categories})
            console.log(categories)
        })
        .catch((error)=>console.log(error))
    }

    destroy(id){
        axios.delete(`/api/categories/${id}`)
        .then(response=>console.log(response.data))
        .then(()=>axios.get('/api/categories'))
        .then(response=>response.data)
        .then(categories=>{
            this.setState({categories})
            console.log(categories)
        })
        .catch((error)=>console.log(error))
    }

    componentDidMount(){
        axios.get('/api/categories')
        .then(response=>response.data)
        .then(categories=>{
            this.setState({categories})
            console.log(categories)
        })
        .catch((error)=>console.log(error))
    }

    render(){
        const {categories} = this.state;
        const destroy = this.destroy;
        const createProduct = this.createProduct;
        const destroyProduct = this.destroyProduct;
        return (
            <div>
                <h1>Acme Categories and Products by faker</h1>
                <button onClick={this.create}>Create Category</button>
                <List args={{categories, destroy, createProduct, destroyProduct}} />
            </div>
        )
    }



}