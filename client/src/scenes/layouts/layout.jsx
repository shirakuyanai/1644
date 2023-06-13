import React from "react";

import Head from '../../components/global/Head'
import Nav from '../../components/global/Nav'
import Subscribe from '../../components/global/Subscribe'
import Features from '../../components/global/Features'
import { Outlet } from "react-router-dom";
import Footer from '../../components/global/Footer'
import Header from '../../components/global/Header'

export default function Layout(){
    return (
        <div>
            {/* Head Element */}
            <Head />
            {/* End of Head Element */}
            
            {/* Header */}
            <div className="header-wrapper">
                {/* Search bar + Account + Cart */}
                <Header/>
                {/* End of Search bar + Account + Cart */}
                
                {/* Nav Bar */}
                <Nav />
                {/* End of Nav Bar */}
            </div>
            {/* End of Header */}

            <Outlet/>

            {/* Subscribe */}
            <Subscribe/>
            {/* End of Subscribe */}
            
            {/* Features */}
            <Features/>
            {/* End of Features */}

            {/* Footer */}
            <Footer/>
            {/* End of Footer */}


        </div>
    );
}