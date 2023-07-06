import React from 'react'
import Header from './Header';
import Hero from './Hero';
import Shorten from './Shorten'
import Footer from './Footer';
import Boost from './Boost';
import './App.css'

function App (){

    return(
        <React.Fragment>
            <Header />
            <Hero />
            <Shorten />
            <Boost />
            <Footer />
        </React.Fragment>
    )
}
export default  App