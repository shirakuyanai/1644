    import React, {useEffect, useState} from 'react'
    import { useNavigate } from "react-router-dom";

    export default function LatestProducts({updateQuantity}){
        const [products, setProducts] = useState([])
        const [brands, setBrands] = useState([])
        const navigate = useNavigate();
        useEffect(() => {
            getProducts()
            getBrands()
            
        },[])

    

        const getProducts = async () => {
            const response = await fetch('http://localhost:5000/products')
            if (response.ok){
                setProducts(await response.json())
            }
        }

        const getBrands = async () => {
            const response = await fetch('http://localhost:5000/brands')
            if (response.ok){
                setBrands(await response.json())
            }
        }
        const handleCartClick = async (productId) => {
            try {
            const response = await fetch(
                `http://localhost:5000/addToCart/${productId}`, // Replace `productId` with the actual product ID
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
        return (
            <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="box">
                        <div className="box-head">
                            <h3 className="head-title">Latest Product</h3>
                        </div>
                        <div className="box-body">
                            <div className="row">
                                {products.map((product, index) => index < 12 && (
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" key={index}>
                                    <div className="product-block">
                                        <div className="product-img" style={{width: '100%', height: '100%'}} ><a href={`/product/${product._id}`}><img src={product.image} style={{width: '100%', height: '100%'}} alt=""/></a></div>
                                        <div className="product-content">
                                            <h5>
                                                <a href={`/product/${product._id}`} className="product-title">{product.name} 
                                                    <strong>({brands.map((brand) => (brand._id === product.brand ? brand.name : ''))})
                                                    </strong>
                                                </a>
                                            </h5>
                                            <div className="product-meta"><a href={`/product/${product._id}`} className="product-price">${(product.price/100 * 20).toFixed(2)}</a>
                                                <a href={`/product/${product._id}`} className="discounted-price">${product.price}</a>
                                                <span className="offer-price">20%off</span>
                                            </div>
                                            <div className="shopping-btn">
                                                <a className="product-btn btn-like"><i className="fa fa-heart"></i></a>
                                                <a  className="product-btn btn-cart" onClick={() => handleCartClick(product._id)}><i  className="fa fa-shopping-cart"></i></a>
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