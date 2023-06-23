import React, {useState, useEffect} from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'


export default function BestSeller({updateQuantity}){
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])
    
    const responsive = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 3000},
            item:5 
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 5
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2
        },
        mobile: {
            breakpoint: {max: 460, min: 0},
            items: 1
        },

    }


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

    
    useEffect(() => {
        getProducts()
        getBrands()
    },[])

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
                          <h3 className="head-title">Best Seller Product</h3>
                      </div>
                  </div>
              </div>
          </div>
          <div className="product-carousel">
              <div className="box-body">
                  <div className="row">
                      <Carousel responsive={responsive} stopOnHover={true} infiniteLoop={false}>
                        {products.map((product, index) => index < 12 && (
                            <div className="item" style={{marginLeft: -14 + 'px'}}>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="product-block">
                                        <div className="product-img"><a href={`/product/${product._id}`}><img src={product.image} alt=""/></a></div>
                                        <div className="product-content">
                                            <h5><a href={`/product/${product._id}`} className="product-title">{product.name} <strong>({brands.map(brand => brand._id === product.brand ? brand.name : '')})</strong></a></h5>
                                            <div className="product-meta"><a href={`/product/${product._id}`} className="product-price">${(product.price/100*80).toFixed(2)}</a>
                                                <a href={`/product/${product._id}`} className="discounted-price">${product.price}</a>
                                                <span className="offer-price">20%off</span>
                                            </div>
                                            <div className="shopping-btn">
                                                <a href={`/product/${product._id}`} className="product-btn btn-like"><i className="fa fa-heart"></i></a>
                                                <a href={`/product/${product._id}`} onClick={() => handleCartClick(product._id)} className="product-btn btn-cart"><i className="fa fa-shopping-cart"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                      </Carousel>
                  </div>
              </div>
          </div>
      </div>
    )
}