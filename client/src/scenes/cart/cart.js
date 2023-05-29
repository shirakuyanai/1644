export default function Cart() {
    return (
        <div className="m-4">
            <div className="text-center m-4">
            <h1>Shopping cart</h1>
            </div>
                <div className="text-center m-4">
                    <a className="text-dark" href="{{ path('app_index') }}">Continue shopping</a>
                </div>
                <div className="container mt-5">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                                <form method="post" id="form_{{form_id}}" action="{{ path('app_cart_edit', {'id': cart.id}) }}">
                                    <tr>
                                        <td>

                                            <a href="#"><img src="#" className="border" /></a>
                                            <br/>
                                            ALksjdas
                                            <button
                                                formaction="{{ path('app_cart_delete', {'id': cart.id}) }}" method="post" onclick="return confirm('Are you sure you want to delete this item?')" className="btn">
                                                Remove
                                            </button>
                                        </td>

                                        <td>
                                            $2394
                                        </td>


                                        <input className="border" name="cart_id" type="hidden" value="{{ cart.id }}"/>

                                        <td><input className="text-center" type="number" value="{{ cart_quantity }}" min="1" max="{{ stock }}" onchange="form_{{form_id}}.submit()" name="input_quantity"/></td>
                                        <td>
                                            $231023
                                        </td>
                                    </tr>
                                </form>

                        </tbody>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Subtotal:</th>
                                <th>$231023</th>
                            </tr>
                        </thead>
                    </table>

                    <div className="text-center m-4">
                        <div>
                            <p>Your cart is currently empty.</p>
                        </div>
                        <a className="btn border bg-dark text-white m-3" href="#">CONTINUE SHOPPING
                            <i className="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>

                <div className="d-flex justify-content-around">
                    <a href="{{ path('app_cart_clear') }}" className="btn border text-white bg-danger" onclick="return confirm('Are you sure you want to clear the cart?')">Clear cart</a>
                    <a className="btn bg-dark text-white"  href="#">Check out</a>
                </div>

            </div>
        </div>
    )
}