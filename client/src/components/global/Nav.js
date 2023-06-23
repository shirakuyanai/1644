import { useEffect, useState } from 'react';

export default function Nav() {
  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getBrand();
    getProducts();
  }, []);

  const getBrand = () => {
    fetch('https://atn-toy-server.onrender.com/brands')
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => console.log(err));
  };
  const getProducts = () => {
    fetch('https://atn-toy-server.onrender.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  };
  const addBrand = async () => {
    const data = await fetch('/newbrand', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newBrand,
      }),
      credentials: 'include',
    }).then(res => res.json());
    setBrands([...brands, data]);
    setNewBrand('');
  };

  return (
    <div className="navigation" style={{backgroundColor: '#a71400'}}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div id="navigation">
              <ul>
                <li className="active">
                  <a href="/index">Home</a>
                </li>
                <li className="has-sub">
                  <a href="#">Brands</a>
                  <ul>
                    {brands.map((item, index) => (
                      <li key={index}>
                        <a href="#">{item.name}</a>
                      </li>
                    ))}
                    
                  </ul>
                  
                </li>
                <li className="has-sub">
                  <a href="#">Products</a>
                  <ul>
                    {products.map((item, index) => (
                      <li key={index}>
                        <a href="#">{item.name}</a>
                      </li>
                    ))}
                    
                  </ul>
                  
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
