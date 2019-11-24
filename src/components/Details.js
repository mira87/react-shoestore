import React, { Component } from 'react'
import { ProductConsumer } from '../context'
import { Link } from 'react-router-dom'
import { ButtonContainer } from './Button'
// import { directive } from '@babel/types';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const { info, id, title, img, price, company, inCart }
                        = value.detailProduct;
                    return (
                        <div className='container py-5'>

                            <div className='row'>
                                <div className='col-10 mx-aut text-center text-slanted text-blue my-5'><h1>{title}</h1></div>
                            </div>
                            {/* end title */}
                            {/* product info */}
                            <div className='row'>
                                <div className='col-8 mx-auto col-mid my-3 text-capitalize'>
                                    <img src={img} className='img-fluid' alt='product' />
                                </div>
                                {/* prodct text */}
                                <div className='col-4 mx-auto col-mid my-3 text-capitalize'>
                                    <h2> model:{title}</h2>
                                    <h4 text-title text-uppercase text-muted mt-3 mb-2>
                                        made by:<span className='text-uppercase'>{company}</span>
                                    </h4>
                                    <h4 className='text-blue'>price:{price}</h4>
                                    <p className='text-capitalized font-weight-bold mt-3 mb-0'>some info about product:</p>
                                    <p className='text-muted lead'>{info}</p>
                                    {/* buttons */}
                                    <div>
                                        <Link to='/'>
                                            <ButtonContainer>back to products</ButtonContainer>
                                        </Link>

                                        <ButtonContainer onClick={() => {
                                            value.addToCart(id);
                                            value.openModal(id);
                                        }}
                                            cart disabled={inCart ? true : false}>
                                            {inCart ? "in Cart" : "add to carrrt"}
                                        </ButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
        )
    }
}
