import React from "react";

export default function Nav(){
    return (
        <div className="navigation">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div id="navigation">
                            <ul>
                                <li className="active"><a href="index.html">Home</a></li>
                                <li className="has-sub"><a href="#">Brands</a>
                                    <ul>
                                        <li><a href="blog-default.html">Brand 1</a></li>
                                        <li><a href="blog-single.html">Brand 2</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}