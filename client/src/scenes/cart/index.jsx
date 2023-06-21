import { useState, useEffect } from 'react';

export default function Cart({ updateQuantity }) {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetchCartData();
    setCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await fetch('http://localhost:5000/viewcart', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setCartData(data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this product?',
      );
      if (confirmDelete) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/cart/product/${itemId}`,
            {
              method: 'DELETE',
              credentials: 'include',
            },
          );
          if (response.ok) {
            const cart = await response.json();
            let quantity = 0;
            cart.forEach(element => {
              quantity += element.quantity;
            });
            setCartData(cart);
            updateQuantity(quantity);
          }
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      }
    } else {
      try {
        const response = await fetch(
          `http://localhost:5000/quantity/${itemId}`,
          {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: newQuantity }),
          },
        );
        if (response.ok) {
          const cart = await response.json();
          setCartData(cart);
          let quantity = 0;
          cart.forEach(element => {
            quantity += element.quantity;
          });
          updateQuantity(quantity);
        }
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  };

  const handleDeleteProduct = async itemId => {
    try {
      const response = await fetch(`/api/cart/product/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        let quantity = 0;
        data.forEach(element => {
          quantity += element.quantity;
        });
        setCartData(data);
        updateQuantity(quantity);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/clearcart', {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        const cart = await response.json();
        setCartData(cart);
        updateQuantity(0);
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    changeTitle('Cart');
  });

  const changeTitle = data => {
    document.title = data;
  };
  let subtotal = 0;

  return (
    <div className="m-4 bg-light">
      <div className="text-center m-4">
        <h1 className="fw-medium fs-1">Shopping cart</h1>
      </div>
      <div className="d-flex justify-content-center m-0">
        <a className="continue_shopping" href="/index">
          <p className="fw-light fs-6">
            <u>Continue shopping</u>
          </p>
        </a>
      </div>
      <div className="container mt-5">
        <table className="table">
          <thead>
            <tr>
              <th className="col-7 ps-0 text-uppercase fw-light fs-6">
                Product
              </th>
              <th className="text-end pe-0 col-1 text-uppercase fw-light fs-6">
                Price
              </th>
              <th className="text-end pe-0 col-3 text-uppercase fw-light fs-6 d-none d-md-table-cell">
                Quantity
              </th>
              <th className="text-end pe-0 col-1 text-uppercase fw-light fs-6 d-none d-md-table-cell">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cartData) && cartData.length > 0 ? (
              cartData.map(
                (item, index) => (
                  (subtotal += item.product.price * item.quantity),
                  (
                    <tr key={index}>
                      <th className="d-flex ps-0 pb-3 pt-3">
                        <div className="me-5">
                          <img
                            className="rounded"
                            style={{ width: '64px', height: '64px' }}
                            src={item.product.image}
                            alt={item.product.name}
                          />
                        </div>
                        <div>
                          <div>
                            <a
                              href="#"
                              className="prod_name text-dark fw-medium fs-6"
                            >
                              {item.product.name}
                            </a>
                          </div>
                          <div>
                            <a
                              href="#"
                              onClick={() => {
                                handleDeleteProduct(item.product._id);
                              }}
                              className="text-secondary-emphasis fw-light fs-6"
                            >
                              <span>Remove</span>
                            </a>
                          </div>
                        </div>
                      </th>
                      <th className="pe-0 pb-md-3 pt-md-3" fw-light fs-6>
                        <p className="pt-md-3 pb-2 fw-light fs-6 m-0 text-end">
                          ${item.product.price}
                        </p>
                        <div className="d-flex p-0 justify-content-end">
                          <p className="me-2 d-md-none d-inline m-0 p-0 fs-6 fw-light">
                            Qty{' '}
                          </p>
                          <input
                            type="number"
                            className="ps-3 m-0 d-md-none d-inline m-0 p-0"
                            style={{ width: '65px' }}
                            value={item.quantity}
                            onChange={event =>
                              handleQuantityChange(
                                item.product._id,
                                event.target.value,
                              )
                            }
                          />
                        </div>
                      </th>
                      <th className="text-end pe-0 pt-4 fw-light fs-6 d-none d-md-table-cell">
                        <input
                          type="number"
                          className="ps-3"
                          style={{ width: '65px' }}
                          value={item.quantity}
                          onChange={event =>
                            handleQuantityChange(
                              item.product._id,
                              event.target.value,
                            )
                          }
                        />
                      </th>
                      <th className="text-end pe-0 pt-4 fw-light fs-6 d-none d-md-table-cell">
                        ${item.product.price * item.quantity}
                      </th>
                    </tr>
                  )
                ),
              )
            ) : (
              <tr>
                <td colSpan="4">
                  {Array.isArray(cartData) ? (
                    <p>Your cart is currently empty.</p>
                  ) : (
                    <p>Error retrieving cart data.</p>
                  )}  
                </td>
              </tr>
            )}
            <tr>
              <th className="col-7"></th>
              <th className="text-end col-1"></th>
              <th className="text-end col-3 fw-light fs-5 d-none d-md-table-cell">
                Subtotal
              </th>
              <th className="text-end col-1 fw-light fs-5 d-none d-md-table-cell">
                ${subtotal}
              </th>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-around">
          <button
            className="btn border text-white bg-danger"
            onClick={() => {
              if (window.confirm('Are you sure you want to clear the cart?')) {
                handleClearCart();
              }
            }}
          >
            Clear cart
          </button>
          <button
  className="btn bg-dark text-white"
  onClick={() => {
    if (subtotal > 0) {
      window.location.href = '/checkout';
    } else {
      alert('Please add products to your cart before checking out.');
    }
  }}
>
  Check out
</button>

        </div>

      
      </div>
    </div>
  );
}
