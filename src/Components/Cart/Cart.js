import React from 'react';
import './Cart.css'

const Cart = (props) => {
    console.log(props.cart)
    const {cart} = props;
    let total = 0;
    for(const product of cart){
        total = total + product.price ;
    }
    let shipping = 0 ;
    for(const product of cart){
        shipping = shipping + product.shipping ; 
    }
    const tax = (total + shipping) * 0.01;

    return (
        <div>
            <div>
                <h2>order summary</h2>
                <h3>Items ordered: {props.cart.length}</h3>
            </div>
            <div className="text-style">
                <p>Items:                    {props.cart.length}</p>
                <p>Total:                    ${total}</p>
                <p>Shipping and Handling:    ${shipping}</p>
                <p>total before tax:         ${total + shipping}</p>
                <p>tax: ${tax}</p>
                <h4 className="total-style">Grand total: ${total + shipping + tax}</h4>
            </div>
        </div>
    );
};

export default Cart;