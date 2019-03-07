import React from 'react'

const List = ({args}) =>{
    const cats = args.categories
    const destroy = args.destroy
    const createProduct = args.createProduct
    const destroyProduct = args.destroyProduct
    return (
        <ul>
            {
                cats.map(
                    category=>(
                        <li key={category.id}>{category.name}
                        <button onClick={()=>{createProduct(category.id)}}>+</button>
                        <button onClick={()=>{destroy(category.id)}}>-</button>
                            <ul>
                               {category.products.map(product=>{
                                    return (<li key={product.id}>{product.name}
                                            <button onClick={(()=>{destroyProduct(product.id)})}>-</button>
                                            </li>
                                    )
                               })}
                            </ul>
                        </li>
                    )
                )
            }
        </ul>
    )
}

export default List