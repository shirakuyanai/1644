import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Product({updateQuantity}) {
  const { id } = useParams();
  const [product, setProduct] = useState({})
  useEffect(() => {
    getProduct()
    if (product){
      changeTitle(product.name);
    }
    else{
      changeTitle('Product');
    }
    
  });

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

  const getProduct = async () => {
    try{
      const response = await fetch('http://localhost:5000/api/product/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (response.ok)
      {
        const data = await response.json()
        setProduct(data)
      }
    }
    catch(ex){
      console.error(ex);
    }
  }

  const changeTitle = data => {
    document.title = data;
  };

  return (
    <div>
      <section className="content">
        <div className="card card-solid">
          <div className="container card-body">
            <div className="row">
              <div className="col-12 col-lg-6">
                <h3 className="d-inline-block d-lg-none">
                  {product.name}
                </h3>
                <div className="col-12 d-flex justify-content-center">
                  <img
                    src={product.image}
                    className="product-image"
                    alt="Product Image"
                  />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <h3 className="my-3">
                  <strong>
                  {product.name}
                  </strong>
                </h3>
                <p>
                <p>({product.stock} in stock)</p>
                </p>
                <div className="mt-5">
                  <h1 className="mb-0 h1 text-danger">${product.price}</h1>
                  <h4 className="mt-0">
                    <lgall>Ex Tax: $80.00 </lgall>
                  </h4>
                </div>

                <div className="mt-12">
                  <div className="btn btn-primary me-5 p-3" onClick={() => handleCartClick(product._id)}>
                    <i className="fas fa-cart-plus fa-lg mr-2"></i>
                    Add to Cart
                  </div>

                  <div className="btn btn-default ms-5 p-3 float-end">
                    <i className="fas fa-heart fa-lg mr-2"></i>
                    Add to Wishlist
                  </div>
                </div>

                <div className="mt-4 product-share">
                  <a href="#" className="text-gray">
                    <i className="fab fa-facebook-square fa-2x"></i>
                  </a>
                  <a href="#" className="text-gray">
                    <i className="fab fa-twitter-square fa-2x"></i>
                  </a>
                  <a href="#" className="text-gray">
                    <i className="fas fa-envelope-square fa-2x"></i>
                  </a>
                  <a href="#" className="text-gray">
                    <i className="fas fa-rss-square fa-2x"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <nav className="w-100">
                <div className="nav nav-tabs" id="product-tab" role="tablist">
                  <a
                    className="nav-item nav-link active"
                    id="product-desc-tab"
                    data-toggle="tab"
                    href="#product-desc"
                    role="tab"
                    aria-controls="product-desc"
                    aria-selected="true"
                  >
                    Description
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="product-comments-tab"
                    data-toggle="tab"
                    href="#product-comments"
                    role="tab"
                    aria-controls="product-comments"
                    aria-selected="false"
                  >
                    Comments
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="product-rating-tab"
                    data-toggle="tab"
                    href="#product-rating"
                    role="tab"
                    aria-controls="product-rating"
                    aria-selected="false"
                  >
                    Rating
                  </a>
                </div>
              </nav>
              <div className="tab-content p-3" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="product-desc"
                  role="tabpanel"
                  aria-labelledby="product-desc-tab"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                >
                </div>
                <div
                  className="tab-pane fade"
                  id="product-comments"
                  role="tabpanel"
                  aria-labelledby="product-comments-tab"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                >
                </div>
                <div
                  className="tab-pane fade"
                  id="product-rating"
                  role="tabpanel"
                  aria-labelledby="product-rating-tab"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
