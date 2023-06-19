import React, {useEffect, useState} from 'react'

export default function LatestProducts(){
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])

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
                          <h3 className="head-title">Latest Product</h3>
                      </div>
                      <div className="box-body">
                          <div className="row">
                            {products.map((product, index) => index < 12 && (
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" key={index}>
                                  <div className="product-block">
                                      <div className="product-img" style={{width: '100%', height: '100%'}} ><img src={product.image} style={{width: '100%', height: '100%'}} alt=""/></div>
                                      <div className="product-content">
                                          <h5>
                                            <a href="#" className="product-title">{product.name} 
                                                <strong>({brands.map((brand) => (brand._id === product.brand ? brand.name : ''))})
                                                </strong>
                                            </a>
                                          </h5>
                                          <div className="product-meta"><a href="#" className="product-price">${(product.price/100 * 20).toFixed(2)}</a>
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
                            ))}
                              
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
}