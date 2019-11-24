import React, { Component } from 'react'
import Product from './Product'
import Title from './Title'
// import { storeProducts } from '../data'
import { ProductConsumer } from '../context'

class ProductList extends Component {
    // state = {
    //     products: storeProducts
    // }
    render() {
        // console.log(this.state.products)
        return (
            <React.Fragment>
                <div className='py-5'>
                    <div className='container'>
                        <Title name='Our' title='Products' />
                        <div className='row'>
                            <ProductConsumer>
                                {(value) => {
                                    // return <h1>{value}</h1>
                                    // console.log(value)
                                    return value.products.map(product => {
                                        // console.log(product.title)
                                        return <Product key={product.id} product={product} />
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
                {/* <Product /> */}
            </React.Fragment>
        )
    }
}

export default ProductList