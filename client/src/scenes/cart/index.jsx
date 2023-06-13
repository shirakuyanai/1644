import { useEffect } from 'react';
export default function Cart() {
  useEffect(() => {
    changeTitle('Cart');
  });

  const changeTitle = data => {
    document.title = data;
  };

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
            <tr>
              <th className="d-flex ps-0 pb-3 pt-3">
                <div className="me-5">
                  <img
                    className="rounded"
                    style={{ width: 64 + 'px', height: 64 + 'px' }}
                    src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&w=1000&q=80"
                  />
                </div>
                <div>
                  <div>
                    <a href="#" className="prod_name text-dark fw-medium fs-6">
                      Product name
                    </a>
                  </div>
                  <div>
                    <a
                      href=""
                      className="text-secondary-emphasis fw-light fs-6"
                    >
                      <span>Remove</span>
                    </a>
                  </div>
                </div>
              </th>
              <th className="pe-0 pb-md-3 pt-md-3" fw-light fs-6>
                <p className="pt-md-3 pb-2 fw-light fs-6 m-0 text-end">
                  $231023
                </p>
                <div className="d-flex p-0 justify-content-end">
                  <p className="me-2 d-md-none d-inline m-0 p-0 fs-6 fw-light">
                    Qty{' '}
                  </p>
                  <input
                    type="number"
                    className="ps-3 m-0 d-md-none d-inline m-0 p-0"
                    style={{ width: 65 + 'px' }}
                    value="1"
                  />
                </div>
              </th>
              <th className="text-end pe-0 pt-4 fw-light fs-6 d-none d-md-table-cell">
                <input
                  type="number"
                  className="ps-3"
                  style={{ width: 65 + 'px' }}
                  value="1"
                />
              </th>
              <th className="text-end pe-0 pt-4 fw-light fs-6 d-none d-md-table-cell">
                $231023
              </th>
            </tr>

            <th className="col-7"></th>
            <th className="text-end col-1"></th>
            <th className="text-end col-3 fw-light fs-5 d-none d-md-table-cell">
              Subtotal
            </th>
            <th className="text-end col-1 fw-light fs-5 d-none d-md-table-cell">
              $231023
            </th>
          </tbody>
        </table>
        <div className="d-flex justify-content-around">
          <a
            href="{{ path('app_cart_clear') }}"
            className="btn border text-white bg-danger"
            onclick="return confirm('Are you sure you want to clear the cart?')"
          >
            Clear cart
          </a>
          <a className="btn bg-dark text-white" href="#">
            Check out
          </a>
        </div>

        <div className="text-center m-4">
          <div>
            <p>Your cart is currently empty.</p>
          </div>
          <a className="btn border bg-dark text-white m-3" href="#">
            CONTINUE SHOPPING
            <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
