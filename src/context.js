import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {

    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0

    }
    componentDidMount() {
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts = []
        storeProducts.forEach(item => {
            const singleItem = { ...item }
            tempProducts = [...tempProducts, singleItem]

        })
        this.setState(() => {
            return { products: tempProducts }
        })
    }

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product }
        })
    }
    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => {
            return {
                products: tempProducts,
                cart: [...this.state.cart, product]
            };

        },
            () => {
                console.log(this.state)
                this.addTotals();
            }
        )

    }

    openModal = (id) => {
        const product = this.getItem(id)
        this.setState(() => {
            return { modalProduct: product, modalOpen: true }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }

    increment = (id) => {
        console.log(`this is increment method`)
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => (
            item.id === id
        ))

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(() => {
            return { cart: [...tempCart] }

        }, () => {
            this.addTotals()

        })

    }

    decrement = (id) => {
        console.log(`this is decrement method`)
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => (
            item.id === id
        ))

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id)
        }
        else {
            product.total = product.count * product.price;
            this.setState(() => {
                return { cart: [...tempCart] }

            }, () => {
                this.addTotals()

            })
        }
    }

    removeItem = (id) => {
        console.log(`this is remove method`)
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => (
            item.id !== id
        ));

        const index = tempProducts.indexOf(this.getItem(id));

        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            };
        },
            () => {
                this.addTotals()
            }
        );
    };

    clearCart = () => {
        console.log(`cart cleared`)
        this.setState(() => {
            return { cart: [] };
        }, () => {
            this.setProducts();
            this.addTotals();
        });

    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (
            subTotal += item.total
        ));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }
    // tester = () => {
    //     console.log('State products:', this.state.products[0].inCart)
    //     console.log('Data products:', storeProducts[0].inCart);

    //     const tempProducts = [...this.state.products];
    //     tempProducts[0].inCart = true;
    //     this.setState(() => {
    //         return { products: tempProducts }

    //     }, () => {
    //         console.log('State products:', this.state.products[0].inCart)
    //         console.log('Data products:', storeProducts[0].inCart);
    //     })

    // }
    render() {
        console.log(this.state.products)
        return (

            // <ProductContext.Provider value="hello from context">
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                decrement: this.decrement,
                clearCart: this.clearCart,
                increment: this.increment,
                removeItem: this.removeItem

            }}>
                {/* <button onClick={this.tester}>test me</button> */}
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;


export { ProductProvider, ProductConsumer };
