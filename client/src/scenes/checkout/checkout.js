import {useState, useEffect} from 'react'
export default function CheckOut() {
    const [pickedDelivery, setPickedDelivery] = useState(1)

    return (
        <div className='bg-light'>
            <div className="container p-5 d-md-flex border">
                <div className="col-md-7 pe-md-5">
                    <h1 className="text-uppercase mt-5 text-center"><strong>logo</strong></h1>

                    <h4 className="font-weight-bold mt-4 mb-2">Contact</h4>
                    <h4 style={{fontSize: 15 + 'px'}}>Username (email)</h4>
                    <a href="#"><h4 style={{color: "#006e99"}}><u>Log out</u></h4></a>

                    <h4 className="font-weight-bold mt-4 mb-2">Delivery method</h4>
                    <div className="button-group pe-sm-4">
                        {pickedDelivery === 1 ?
                            (
                                <div className="align-middle p-2" style={{ borderTopLeftRadius: 5 + 'px', borderTopeightRadius: 5 + 'px', backgroundColor: '#cce6ff', border: '1px solid #006e99' }} onClick={() => setPickedDelivery(1)}>
                                    <input type="radio" name="method" value="ship" checked /> <i className="m-2 fa fa-truck"></i> <label className='text-dark'>Ship</label>
                                </div>
                            )
                            :
                            (
                                <div className="border align-middle p-2" style={{borderTopLeftRadius: 5 + 'px', borderTopeightRadius: 5 + 'px'}} onClick={() => setPickedDelivery(1)}>
                                    <input type="radio" name="method" value="ship" /> <i className="m-2 fa fa-truck"></i> <label className='text-dark'>Ship</label>
                                </div>
                            )
                        }
                        {pickedDelivery === 2 ?
                            (
                                <div className="align-middle p-2" style={{ borderBottomLeftRadius: 5 + 'px', borderBottomRightRadius: 5 + 'px', backgroundColor: '#cce6ff', border: '1px solid #006e99' }} onClick={() => setPickedDelivery(2)}>
                                    <input type="radio" name="method" value="pickup" style={{borderBottomLeftRadius: 5 + 'px', borderBottomRightRadius: 5 + 'px'}}  checked /> <i className="m-2 fa fa-store"></i> <label className='text-dark'>Pickup</label>
                                </div>
                            )
                            :
                            (
                                <div className="border rounded-bottom align-middle p-2" onClick={() => setPickedDelivery(2)}>
                                    <input type="radio" name="method" value="pickup" /> <i className="m-2 fa fa-store"></i> <label className='text-dark'>Pickup</label>
                                </div>
                            )
                        }
                    </div>

                    <h4 className="font-weight-bold mt-4 mb-2">Shipping address</h4>

                    <div class="form-floating">
                        <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected value="1">Country 1 (User 1)</option>
                            <option value="1">Country 2 (User 2)</option>
                            <option value="3">Use a new address</option>
                        </select>
                        <label for="floatingSelect">Works with selects</label>
                    </div>

                    <div className="mt-3 d-md-flex">
                        <div class="form-floating col-md-6">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating col-md-6">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                            <label for="floatingPassword">Password</label>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-5 d-none bg-light d-md-block border-start p-0">
                    <h1>Hello, World!</h1>
                </div>
            </div>
        </div>
    )
}