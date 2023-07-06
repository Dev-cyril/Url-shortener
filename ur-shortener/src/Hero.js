import React from 'react'
import illustration from './images/illustration-working.svg'
import './Hero.css'

function Hero() {
    return(
        <section className='hero'>
            <div className='text'>
                <h1>More than just <br /> shorter links</h1>
                <p>Build your brand’s recognition and get detailed insights 
                    on how your links are performing.</p>
                <button className='getStarted'>Get Started</button>
            </div>
            <img src={illustration}></img>
        </section>
    )
}

export default Hero