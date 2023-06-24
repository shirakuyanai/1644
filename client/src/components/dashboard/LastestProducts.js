import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LatestProducts({ updateQuantity }) {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
    getBrands();
  }, []);

  const getProducts = async () => {
    const response = await fetch('http://localhost:5000/products');
    if (response.ok) {
      setProducts(await response.json());
    }
  };

  const getBrands = async () => {
    const response = await fetch('http://localhost:5000/brands');
    if (response.ok) {
      setBrands(await response.json());
    }
  };

  const handleCartClick = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/addToCart/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const cart = await response.json();
        let quantity = 0;
        cart.forEach((element) => {
          quantity += element.quantity;
        });
        updateQuantity(quantity);
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  const filteredProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const brandName = brands.find((brand) => brand._id === product.brand)?.name.toLowerCase() || '';
    const search = searchQuery.toLowerCase();
    return productName.includes(search) || brandName.includes(search);
  });

  const sortedProducts = [...filteredProducts];

  if (sortOption === 'priceAsc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'priceDesc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="">
            <div className="search-bg">
                
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Search Here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              <div>
              <label className="mr-2">Sort By:</label>
              <select
                id="sort"
                className="form-control"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">None</option>
                <option value="priceAsc">Price (Low to High)</option>
                <option value="priceDesc">Price (High to Low)</option>
              </select>
            </div>
            </div>

        

            <div className="box-body">
              {sortedProducts.length === 0 ? (
                <div className="not-found-message">
                  {searchQuery && `No product found with name "${searchQuery}"`}
                </div>
              ) : (
                <div className="row">
                  {sortedProducts.map((product, index) => (
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" key={index}>
                      <div className="product-block">
                        <div className="product-img" style={{ width: '100%', height: '100%' }}>
                          <a href={`/product/${product._id}`}>
                            <img src={product.image} style={{ width: '100%', height: '100%' }} alt="" />
                          </a>
                        </div>
                        <div className="product-content">
                          <h5>
                            <a href={`/product/${product._id}`} className="product-title">
                              {product.name}{' '}
                              <strong>
                                {brands.find((brand) => brand._id === product.brand)?.name || ''}
                              </strong>
                            </a>
                          </h5>
                          <div className="product-meta">
                            <a href={`/product/${product._id}`} className="product-price">
                              ${(product.price / 100 * 20).toFixed(2)}
                            </a>
                            <a href={`/product/${product._id}`} className="discounted-price">
                              ${product.price}
                            </a>
                            <span className="offer-price">20% off</span>
                          </div>
                          <div className="shopping-btn">
                            <a
                              className="product-btn btn-cart bg-transparent text-dark"
                              onClick={() => handleCartClick(product._id)}
                            >
                              <i className="fa fa-shopping-cart"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
