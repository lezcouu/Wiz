import React from 'react'
import Dashboard from "../containers/Dashboard.jsx"
import fondo from "../assets/fondo.jpg"
import "../containers/Style.css"

const Home = () => {
    return (
        <div >
            <img className="fondo" src={fondo} alt="fondo"/>
            <Dashboard />            
        </div>
    )
}

export default Home
