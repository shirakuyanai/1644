import React from 'react'

export default function BestSeller(){
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
                      <div className="owl-carousel owl-two owl-theme">
                          <div className="item">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="product-block">
                                      <div className="product-img"><img src="../assets/images/product_img_5.png" alt=""/></div>
                                      <div className="product-content">
                                          <h5><a href="#" className="product-title">Apple iPhone 6 <strong>(32 GB, Gold)</strong></a></h5>
                                          <div className="product-meta"><a href="#" className="product-price">$1700</a>
                                              <a href="#" className="discounted-price">$2000</a>
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
                          <div className="item">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="product-block">
                                      <div className="product-img"><img src="../assets/images/product_img_6.png" alt=""/></div>
                                      <div className="product-content">
                                          <h5><a href="#" className="product-title">Apple iPhone 7 <strong>(256 GB, Black)</strong> </a></h5>
                                          <div className="product-meta"><a href="#" className="product-price">$1400</a>
                                              <a href="#" className="discounted-price"><strike>$1800</strike></a>
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
                          <div className="item">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="product-block">
                                      <div className="product-img"><img src="../assets/images/product_img_7.png" alt=""/></div>
                                      <div className="product-content">
                                          <h5><a href="#" className="product-title">Apple iPhone 6S <strong>(32GB, Gold)</strong> </a></h5>
                                          <div className="product-meta"><a href="#" className="product-price">$1300</a>
                                              <a href="#" className="discounted-price"><strike>$2000</strike></a>
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
                          <div className="item">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="product-block">
                                      <div className="product-img"><img src="../assets/images/product_img_8.png" alt=""/></div>
                                      <div className="product-content">
                                          <h5><a href="#" className="product-title">Apple iPhone X <strong>(64 GB, Grey)</strong></a></h5>
                                          <div className="product-meta"><a href="#" className="product-price">$1200</a>
                                              <a href="#" className="discounted-price"><strike>$2000</strike></a>
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
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
}