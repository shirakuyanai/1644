import React from "react";

export default function Header(){
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8">
                    <div className="logo">
                        <a href="index.html"><img src="../images/logo.png" alt=""/> </a>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="search-bg">
                        <input type="text" className="form-control" placeholder="Search Here"/>
                        <button type="Submit"><i className="fa fa-search"></i></button>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <div className="account-section">
                        <ul>
                            <li><a href="#" className="title hidden-xs">My Account</a></li>
                            <li className="hidden-xs">|</li>
                            <li><a href="#" className="title hidden-xs">Register</a></li>
                            <li><a href="#" className="title"><i className="fa fa-shopping-cart"></i>   <sup className="cart-quantity">1</sup></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}