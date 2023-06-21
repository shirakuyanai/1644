import React, { useState, useEffect } from 'react';


export default function CheckOut() {
  const [pickedDelivery, setPickedDelivery] = useState(1);
  const [loggedIn, setLoggedIn] = useState({});
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [Address1, setSelectedAddress] = useState('');

  const [zipcode, setZipcode] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    changeTitle('Checkout');
    checkLoginStatus();
    setCartData();
    fetchBrandData();
    fetchCartData();
  }, []);
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((response) => response.json())
      .then((data) => setProvinces(data))
      .catch((error) => console.log(error));
  }, []);
  
  const [brandData, setBrandData] = useState([]);

  const fetchBrandData = async () => {
    const res = await fetch("http://localhost:5000/brands", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setBrandData(data);
      console.log("get brand data");
    }
  };
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
  const checkLoginStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/checkLoginStatus', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setLoggedIn(data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const orderSubmit = async (e) => {
    e.preventDefault();
    try {
      const address = `${Address1}, ${selectedDistrict}, ${selectedWard}, ${selectedProvince}, ${zipcode}`;
      const data = {
        user: loggedIn._id,
        address: address,
      };
      const response = await fetch('http://localhost:5000/neworder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        // Handle error response
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  const changeTitle = data => {
    document.title = data;
  };

  const handleDeliveryOptionChange = option => {
    setPickedDelivery(option);
  };

  const handleQuantityChange = e => {
    e.preventDefault();
    // Process the form submission here
  };
  const getBrandName = (brandId) => {
    const brand = brandData.find((brand) => brand._id === brandId);
    return brand ? brand.name : "";
  };
  let subtotal = 0;
  let ship = 10;

  return (
    <div className="bg-light">
      {Object.keys(loggedIn).length === 0 ? (
        <div>ERROR: NOT LOGGED IN</div>
      ) : (
        <div className="bg-light">
          <div className="container d-lg-flex pt-0 ps-lg-3 pe-lg-5 pb-0">
            <div className="col-lg-7 ps-lg-5 pe-lg-5">
              <div className="ps-lg-5 pe-lg-3">
                <h1 className="text-uppercase mt-5 text-center">
                  <strong>logo</strong>
                </h1>

                <h4 className="mt-4 mb-2">
                  <strong>Contact</strong>
                </h4>
                <h4>Name: {loggedIn.firstname} {loggedIn.lastname}</h4>
                <h4>Email: {loggedIn.email}</h4>
                <a href="#">
                  <u>Log out</u>
                </a>

                <h4 className="mt-5">
                  <strong>Delivery method</strong>
                </h4>
                <div className="button-group">
                  {pickedDelivery === 1 ? (
                    <div
                      className="align-middle p-2 rounded-top"
                      style={{
                        backgroundColor: '#cce6ff',
                        border: '1px solid #006e99',
                      }}
                      onClick={() => setPickedDelivery(1)}
                    >
                      <input type="radio" name="method" value="ship" checked />{' '}
                      <i className="m-2 fa fa-truck"></i>{' '}
                      <label className="text-dark">Ship</label>
                    </div>
                  ) : (
                    <div
                      className="border align-middle p-2 rounded-top"
                      onClick={() => setPickedDelivery(1)}
                    >
                      <input type="radio" name="method" value="ship" />{' '}
                      <i className="m-2 fa fa-truck"></i>{' '}
                      <label className="text-dark">Ship</label>
                    </div>
                  )}
                  {pickedDelivery === 2 ? (
                    <div
                      className="align-middle p-2 rounded-bottom"
                      style={{
                        backgroundColor: '#cce6ff',
                        border: '1px solid #006e99',
                      }}
                      onClick={() => setPickedDelivery(2)}
                    >
                      <input
                        type="radio"
                        name="method"
                        value="pickup"
                        checked
                      />{' '}
                      <i className="m-2 fa fa-store"></i>{' '}
                      <label className="text-dark">Pickup</label>
                    </div>
                  ) : (
                    <div
                      className="border rounded-bottom align-middle p-2 rounded-bottom"
                      onClick={() => setPickedDelivery(2)}
                    >
                      <input type="radio" name="method" value="pickup" />{' '}
                      <i className="m-2 fa fa-store"></i>{' '}
                      <label className="text-dark">Pickup</label>
                    </div>
                  )}
                </div>

                <h4 className="mt-5">
                  <strong>Shipping address</strong>
                </h4>

                <div className="form-floating">
                <select
                     name="province"
                     id="province"
                     className="form-select rounded"
                     value={selectedProvince}
                     onChange={(e) => setSelectedProvince(e.target.value)}
                     required
                  >
                    <option value=""></option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                  <label for="floatingSelect">City</label>
                </div>

                <div className="d-lg-flex justify-content-center mt-3">
                  <div className="form-floating col-lg-6 pe-lg-2 mb-0">
                    
                  <input
                      type="text"
                      className="form-control"
                      id="ward"
                      placeholder=""
                      value={selectedWard}
                      onChange={(e) => setSelectedWard(e.target.value)}
                      required
                    />
                    <label for="floatingInput">Ward</label>
                  </div>

                  <div className="form-floating col-lg-6 ps-lg-1 mt-3 mt-lg-0 mb-0">
                      <input
                      type="text"
                      className="form-control"
                      id="district"
                      placeholder=""
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      required
                    />
                    <label for="floatingInput">District</label>
                  </div>
                </div>


                <div className="form-floating col-lg-12 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    id="zipcode"
                    placeholder=""
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    required
                  />
                  <label for="floatingInput">ZIP code</label>
                </div>
                <div className="form-floating col-lg-12 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    id="zipcode"
                    placeholder=""
                    value={Address1}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    required
                  />
                  <label for="floatingInput">Specific Address</label>
                </div>

                <div className="form-floating col-lg-12 mb-4">
                  <input
                    type="text"
                    name="phone"
                    className="form-control rounded"
                    id="floatingInput"
                    placeholder="Phone"
                  />
                  <label for="floatingInput">Phone</label>
                </div>
                {Address1 &&(
        <div>
        <p>Full Address: {Address1}, {selectedDistrict}, {selectedWard}   , {selectedProvince}, {zipcode}</p>
      </div>
      )}  
        
    
                <div className="text-center d-lg-lex">
                  <div>
                    <input
                      type="button"
                      className="btn btn-primary float-lg-end mb-4"
                      onClick={orderSubmit}
                      value="Continude to shipping"
                    />
                  </div>
                  <div>
                    <a href="/cart" className="float-lg-start mt-3 mb-0">
                      <i className="fa-solid fa-angle-left me-3"></i>Return to
                      cart
                    </a>
                  </div>
                </div>
                <br />
                <br className="d-none d-lg-block" />
                <hr className="border border-dark mt-lg-5 mt-0 mb-3" />
                <div className="d-flex">
                  <h5>
                    <a href="#" className="pe-3">
                      <u>Refund policies</u>
                    </a>
                  </h5>
                  <h5>
                    <a href="#" className="pe-3">
                      <u>Refind policies</u>
                    </a>
                  </h5>
                  <h5>
                    <a href="#" className="pe-3">
                      <u>Terms of services</u>
                    </a>
                  </h5>
                </div>
              </div>
            </div>

            <div className="col-lg-5 d-none bg-light d-lg-block border-start pt-5 ps-4 pe-4">
              <div className="pt-3">
                {Array.isArray(cartData) && cartData.length > 0 ? (
                  cartData.map(
                    (item, index) => (
                      subtotal += item.product.price * item.quantity,
                      (
                        <div className="row item p-1 ps-2 pb-4">
                          <div
                            className="col-3 d-flex p-0"
                            style={{ width: 100 + 'px' }}
                          >
                            <h5
                              className="rounded-circle bg-secondary text-center text-white"
                              style={{
                                width: 21 + 'px',
                                height: 21 + 'px',
                                paddingTop: 2 + 'px',
                                transform:
                                  'translate(' + 71 + 'px, ' + -11 + 'px)',
                              }}
                            >
{item.  quantity}
                            </h5>
                            <img
                              className="rounded border"
                              style={{ width: 64 + 'px', height: 64 + 'px' }}
                              src={item.product.image}
                            />
                          </div>
                          <div className="col m-0 p-0 text-start">
                            <h5 className="mb-0">
                              <strong>{item.product.name}</strong>
                            </h5>

                            <span className="m-0 p-0">Brand: {getBrandName(item.product.brand)}</span>
                          </div>
                          <div className="col text-end mt-3 me-5">
                            <h4>${item.product.price}</h4>
                          </div>
                        </div>
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
              </div>
              <div className="ps-3 pe-5">
                <hr className="border border-dark mt-0 mb-3" />
              </div>
              <div className="ps-3 pe-5">
                <div className="row justify-content-between">
                  <p className="col-auto fw-medium text-dark fs-6 m-0">
                    Subtotal
                  </p>
                  <p className="col-auto fw-bold text-dark fs-6 m-0">
                    ${subtotal}
                  </p>
                </div>
                <div className="row justify-content-between">
                  <h4 className="col-auto fw-medium text-dark fs-6 m-0">
                    Shipping
                  </h4>
                  <h4 className="col-auto fw-bold text-dark fs-6 m-0">
                    ${ship}
                  </h4>
                </div>
                <div className="row justify-content-between">
                  <h4 className="col-auto fw-medium text-dark fs-6 m-0">
                    Estimated tax
                  </h4>
                  <h4 className="col-auto fw-bold text-dark fs-6 m-0">
                    ${(subtotal+ship)*5/100} (5% Tax)
                  </h4>
                </div>
                <div className="row justify-content-between">
                  <h4 className="col-auto fw-bold text-dark fs-5 m-0">Total</h4>
                  <h4 className="col-auto fw-bold text-dark fs-5 m-0">
                    ${((subtotal+ship)*5/100)+subtotal} 
                  </h4>
                </div>
              </div>
            </div>
          </div>  
        </div>
      )}
    </div>
  );
}
