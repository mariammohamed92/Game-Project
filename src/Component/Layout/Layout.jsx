import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Layout({userData,logOut}) {
    return <>
        <Navbar userData={userData} logOut={logOut}/>
        <div className="container-fluid m-0 p-0">
            <Outlet></Outlet>
        </div>

        <Footer userData={userData}/>
</>

}


