import React, {useEffect, useState} from 'react'

export default function FeaturedProducts({updateQuantity}){
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])

    useEffect(() => {
        getProducts()
        getBrands()
        
    },[])

    const handleCartClick = async (productId) => {
        try {
        const response = await fetch(
            `https://atn-toy-server.onrender.com/addToCart/${productId}`, // Replace `productId` with the actual product ID
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            }
        );
        if (response.ok) {
            const cart = await response.json();
            let quantity = 0
            cart.forEach(element => {
              quantity += element.quantity
            }); 
            updateQuantity(quantity)
        }
        } catch (ex) {
        console.error(ex);
        }
    };

    const getProducts = async () => {
        const response = await fetch('https://atn-toy-server.onrender.com/products')
        if (response.ok){
            setProducts(await response.json())
        }
    }

    const getBrands = async () => {
        const response = await fetch('https://atn-toy-server.onrender.com/brands')
        if (response.ok){
            setBrands(await response.json())
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="box">
                        <div className="box-head">
                            <h3 className="head-title">Featured Product</h3>
                        </div>
                        <div className="box-body">
                            <div className="row">
                                {products.map((product, index) => index < 4 && (
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" key={index}>
                                        <div className="product-block">
                                            <div className="product-img"><img src={product.image} alt=""/></div>
                                            <div className="product-content">
                                                <h5><a href={`/product/${product._id}`} className="product-title">{product.name}</a></h5>
                                                <div className="product-meta"><a href={`/product/${product._id}`} className="product-price">${product.price/100*60}</a>
                                                    <a href={`/product/${product._id}`} className="discounted-price"><strike>${product.price}</strike></a>
                                                    <span className="offer-price">40%off</span>
                                                </div>
                                                <div className="shopping-btn">
                                                    <a href={`/product/${product._id}`} className="product-btn btn-like"><i className="fa fa-heart"></i></a>
                                                    <a href={`/product/${product._id}`} onClick={() => handleCartClick(product._id)} className="product-btn btn-cart"><i className="fa fa-shopping-cart"></i></a>   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}