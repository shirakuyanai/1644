import React, {useState, useEffect} from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'


export default function BestSeller(){
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
                                        <div className="product-img"><img src={product.image} alt=""/></div>
                                        <div className="product-content">
                                            <h5><a href="#" className="product-title">{product.name} <strong>({brands.map(brand => brand._id === product.brand ? brand.name : '')})</strong></a></h5>
                                            <div className="product-meta"><a href="#" className="product-price">${(product.price/100*80).toFixed(2)}</a>
                                                <a href="#" className="discounted-price">${product.price}</a>
                                                <span className="offer-price">20%off</span>
                                            </div>
                                            <div className="shopping-btn">
                                                <a href="#" className="product-btn btn-like"><i className="fa fa-heart"></i></a>
                                                <a href="#" className="product-btn btn-cart"><i className="fa fa-shopping-cart"></i></a>
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