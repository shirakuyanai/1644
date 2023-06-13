import {useState, useEffect} from 'react'
export default function CheckOut() {
    const [pickedDelivery, setPickedDelivery] = useState(1)
    useEffect(() =>{
        changeTitle('Checkout')
    })

    const changeTitle = (data) => {
        document.title = data;
    }

    return (
        <div className='bg-light'>
            <div className='container d-lg-flex pt-0 ps-lg-3 pe-lg-5 pb-0'>
                <div className="col-lg-7 ps-lg-5 pe-lg-5">
                    <div className='ps-lg-5 pe-lg-3'>
                        <h1 className="text-uppercase mt-5 text-center"><strong>logo</strong></h1>

                        <h4 className="mt-4 mb-2"><strong>Contact</strong></h4>
                        <h4 style={{fontSize: 15 + 'px'}}>Username (email)</h4>
                        <a href="#"><u>Log out</u></a>

                        <h4 className="mt-5"><strong>Delivery method</strong></h4>
                        <div className="button-group">
                            {pickedDelivery === 1 ?
                                (
                                    <div className="align-middle p-2 rounded-top" style={{ backgroundColor: '#cce6ff', border: '1px solid #006e99' }} onClick={() => setPickedDelivery(1)}>
                                        <input type='radio' name="method" value="ship" checked /> <i className="m-2 fa fa-truck"></i> <label className='text-dark'>Ship</label>
                                    </div>
                                )
                                :
                                (
                                    <div className="border align-middle p-2 rounded-top" onClick={() => setPickedDelivery(1)}>
                                        <input type="radio" name="method" value="ship" /> <i className="m-2 fa fa-truck"></i> <label className='text-dark'>Ship</label>
                                    </div>
                                )
                            }
                            {pickedDelivery === 2 ?
                                (
                                    <div className="align-middle p-2 rounded-bottom" style={{ backgroundColor: '#cce6ff', border: '1px solid #006e99' }} onClick={() => setPickedDelivery(2)}>
                                        <input type="radio" name="method" value="pickup" checked /> <i className="m-2 fa fa-store"></i> <label className='text-dark'>Pickup</label>
                                    </div>
                                )
                                :
                                (
                                    <div className="border rounded-bottom align-middle p-2 rounded-bottom" onClick={() => setPickedDelivery(2)}>
                                        <input type="radio" name="method" value="pickup" /> <i className="m-2 fa fa-store"></i> <label className='text-dark'>Pickup</label>
                                    </div>
                                )
                            }
                        </div>

                        <h4 className="mt-5"><strong>Shipping address</strong></h4>

                        <div className="form-floating">
                            <select className="form-select" name='saved_addresses' id="floatingSelect" aria-label="Saved addresses">
                                <option selected value="address_1_id">Address 1 (Name 1)</option>
                                <option value="address_2">Address 2 (Name 2)</option>
                                <option value="new_address">Use a new address</option>
                            </select>
                            <label for="floatingSelect">Saved addresses</label>
                        </div>

                        <div className="d-lg-flex">
                            <div className="form-floating col-lg-6 pe-lg-2 mt-3">
                                <input type="text" name='firstname' className="form-control rounded p-0 m-0" id="floatingInput" placeholder="First name"/>
                                <label for="floatingInput">First name</label>
                            </div>
                            <div className="form-floating col-lg-6 ps-lg-1 mt-3">
                                <input type="text" name='lastname' className="form-control rounded p-0 m-0" id="floatingInput" placeholder="Last name"/>
                                <label for="floatingInput">Last name</label>
                            </div>
                        </div>

                        <div className='d-lg-flex justify-content-center mt-3'>
                            <div className="form-floating col-lg-6 pe-lg-2 mb-0">
                                <select className="form-select" name='ward' id="floatingSelect" aria-label="Ward">
                                    <option selected value="Ward 1">Ward 1</option>
                                    <option value="Ward 2">Ward 2</option>
                                    <option value="Ward 3">Ward 3</option>
                                    <option value="Ward 4">Ward 4</option>
                                    <option value="Ward 5">Ward 5</option>
                                    <option value="Ward 5">Ward 6</option>
                                    <option value="Ward 7">Ward 7</option>
                                </select>
                                <label for="floatingSelect">Ward</label>
                            </div>

                            <div className="form-floating col-lg-6 ps-lg-1 mt-3 mt-lg-0 mb-0">
                                <select className="form-select" name='province' id="floatingSelect" aria-label="Province">
                                    <option selected value="Ward 1">Province 1</option>
                                    <option value="Province 2">Province 2</option>
                                    <option value="Province 3">Province 3</option>
                                    <option value="Province 4">Province 4</option>
                                    <option value="Province 5">Province 5</option>
                                    <option value="Province 5">Province 6</option>
                                    <option value="Province 7">Province 7</option>
                                </select>
                                <label className='ps-lg-3' for="floatingSelect">Province</label>
                            </div>
                        </div>

                        <div className='d-lg-flex justify-content-center mt-3'>
                            <div className="form-floating col-lg-6 pe-lg-2">
                                <select className="form-select" name='district' id="floatingSelect" aria-label="District">
                                    <option selected value="District 1">District 1</option>
                                    <option value="District 2">District 2</option>
                                    <option value="District 3">District 3</option>
                                    <option value="District 4">District 4</option>
                                    <option value="District 5">District 5</option>
                                    <option value="District 5">District 6</option>
                                    <option value="District 7">District 7</option>
                                </select>
                                <label for="floatingSelect">District</label>
                            </div>

                            <div className="form-floating col-lg-6 ps-lg-1 mt-3 mt-lg-0">
                                <select className="form-select" name='city' id="floatingSelect" aria-label="City">
                                    <option selected value="City 1">City 1</option>
                                    <option value="City 2">City 2</option>
                                    <option value="City 3">City 3</option>
                                    <option value="City 4">City 4</option>
                                    <option value="City 5">City 5</option>
                                    <option value="City 5">City 6</option>
                                    <option value="City 7">City 7</option>
                                </select>
                                <label className='ps-lg-3' for="floatingSelect">City</label>
                            </div>
                        </div>

                        <div className="form-floating col-lg-12 mt-3">
                            <input type="text" name='zipcode' className="form-control rounded" id="floatingInput" placeholder="ZIP code"/>
                            <label for="floatingInput">ZIP code</label>
                        </div>

                        <div className="form-floating col-lg-12 mb-4">
                            <input type="text" name='phone' className="form-control rounded" id="floatingInput" placeholder="Phone"/>
                            <label for="floatingInput">Phone</label>
                        </div>

                        <div className='text-center d-lg-lex'>
                            <div>
                                <input type='button' className='btn btn-primary float-lg-end mb-4' value="Continue to shipping"/>
                            </div>
                            <div>
                                <a href='/cart' className='float-lg-start mt-3 mb-0'><i className="fa-solid fa-angle-left me-3"></i>Return to cart</a>
                            </div>
                        </div>
                        <br/>
                        <br className='d-none d-lg-block'/>
                        <hr className='border border-dark mt-lg-5 mt-0 mb-3'/>
                        <div className='d-flex'>
                        <h5><a href="#" className='pe-3'><u>Refund policies</u></a></h5>
                        <h5><a href="#" className='pe-3'><u>Refind policies</u></a></h5>
                        <h5><a href="#" className='pe-3'><u>Terms of services</u></a></h5>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-5 d-none bg-light d-lg-block border-start pt-5 ps-4 pe-4">
                    <div className='pt-3'>
                        <div className='row item p-1 ps-2 pb-4'>
                            <div className='col-3 d-flex p-0' style={{width: 100 + 'px'}}>
                                <h5 className='rounded-circle bg-secondary text-center text-white' style={{width: 21 + 'px', height: 21 + 'px', paddingTop: 2 + 'px', transform: 'translate(' + 71 + 'px, ' + -11 + 'px)' }}>1</h5>
                                <img className='rounded border' style={{width: 64 + 'px', height: 64 + 'px'}} src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&w=1000&q=80"/>
                            </div>
                            <div className='col m-0 p-0 text-start'>
                                <h5 className='mb-0'><strong>Product name</strong></h5>
                                <span className='m-0 p-0'>Model: asdas</span>
                                <br/>
                                <span className='m-0 p-0'>Color: asdas</span>
                            </div>
                            <div className='col text-end mt-3 me-5'>
                                <h4>$499.00</h4>
                            </div>
                        </div>
                        

                        <div className='row item p-1 ps-2 pb-4'>
                            <div className='col-3 d-flex p-0' style={{width: 100 + 'px'}}>
                                <h5 className='rounded-circle bg-secondary text-center text-white' style={{width: 21 + 'px', height: 21 + 'px', paddingTop: 2 + 'px', transform: 'translate(' + 71 + 'px, ' + -11 + 'px)' }}>1</h5>
                                <img className='rounded border' style={{width: 64 + 'px', height: 64 + 'px'}} src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&w=1000&q=80"/>
                            </div>
                            <div className='col m-0 p-0 text-start'>
                                <h5 className='mb-0 mt-4'><strong>Product name</strong></h5>
                            </div>
                            <div className='col text-end mt-3 me-5'>
                                <h4>$499.00</h4>
                            </div>
                        </div>
                        
                        
                    </div>
                    <div className='ps-3 pe-5'>
                        <hr className='border border-dark mt-0 mb-3'/>
                    </div>
                    <div className='ps-3 pe-5'>
                        <div className='row justify-content-between'>
                            <p className="col-auto fw-medium text-dark fs-6 m-0">Subtotal</p>
                            <p className="col-auto fw-bold text-dark fs-6 m-0">$2,132,212.00</p>
                        </div>
                        <div className='row justify-content-between'>
                            <h4 className="col-auto fw-medium text-dark fs-6 m-0">Shipping</h4>
                            <h4 className="col-auto fw-bold text-dark fs-6 m-0">$2,132,212.00</h4>
                        </div>
                        <div className='row justify-content-between'>
                            <h4 className="col-auto fw-medium text-dark fs-6 m-0">Estimated tax</h4>
                            <h4 className="col-auto fw-bold text-dark fs-6 m-0">$2,212.00</h4>
                        </div>
                        <div className='row justify-content-between'>
                            <h4 className="col-auto fw-bold text-dark fs-5 m-0">Total</h4>
                            <h4 className="col-auto fw-bold text-dark fs-5 m-0">$2,132,212.00</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}