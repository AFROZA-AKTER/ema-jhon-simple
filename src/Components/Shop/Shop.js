import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
/* ctrl+shift+f mere jekono text k search kora hoy */
const Shop = () => {
    const [products , setProducts] = useState([])
    const [cart , setCart] = useState([])
    const [displayProducts , setDisplayProducts] = useState([])

    useEffect(() => {
        console.log('prduct API called')
        fetch('./products.JSON')
        .then(res => res.json())
        .then(data =>  {
            setProducts(data)
            setDisplayProducts(data)
            // console.log('products received')
        })
        
    },[])

    useEffect(() => {
        console.log('local storage cart called')
        if(products.length){
            const savedCart = getStoredCart();
            const storedCart = [];
            // console.log(savedCart)
            /* array of object er vitor theke kono ekta particular item k khuje ber korar system holo: array er name then '.' filter/find . 
            1.filter er kaj hocche ami je jinish ta dibo setar sathe joto gula maching pabe sobgula k ekta array hisebe amake dibe.
            2. ar find hocche jodi oi item ta pay tahole dibe ar na hole undefinded dibe
             */
            for(const key in savedCart){
                const addedProduct = products.find(product => product.key === key)
                // console.log(key , addedProduct)
                storedCart.push(addedProduct);
            }
             setCart(storedCart);
        }
        
    } , [products])
    /* useEffect e jodi empty-array[] thake tahole by default useEffect er function ta k ekbar call kora hbe. empty-array er  */

    const handleAddToCart = (product) => {
        const newCart = [...cart , product] 
        setCart(newCart)
        // save to local storage (for now)
        addToDb(product.key)
    }

    const handleSearch = event => {
        // console.log(event.target.value)
        const searchText = event.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchedProducts)
        console.log(matchedProducts.length)
    }
    return (
        <div>
            <div className="search-container">
                <input 
                  onChange={handleSearch}
                  type="text"  
                  placeholder="search product" />
            </div>
            <div className="shop-container">
                <div className="product-container">
                    
                    {
                        displayProducts.map(product => <Product 
                            key={product.key}
                            product={product}
                            handleAddToCart ={handleAddToCart}
                            ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <div className="cart-header">
                    <Cart cart={cart}></Cart>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Shop;