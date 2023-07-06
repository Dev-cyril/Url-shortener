import React, { useRef, useState } from 'react'
import brand from './images/icon-brand-recognition.svg'
import records from './images/icon-detailed-records.svg'
import customize from './images/icon-fully-customizable.svg'
import './Stat.css'
import './Shorten.css'

function Shorten() {
    const data = useRef(null)
    const [emptyStyle, setEmptyStyle] = useState(false)
    const [buttonValue, setButtonValue] = useState('Copy');

    const allItems = {};
    if (localStorage.length > 0){
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            allItems[key] = value;
        }
    }

    const headers = {
        "Content-Type": "application/json",
        "apikey": "f3a9dc973cc640b9b9a7c0f78a6d7611"
    };

    async function getApiData(url) {
        const endpoint = "https://api.rebrandly.com/v1/links";
        
        const linkRequest = {
            destination: url,
            domain: { fullName: "rebrand.ly" }
        };

        const apiCall = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(linkRequest)
        };

        try{
            const response = await fetch(endpoint, apiCall);
            const link = await response.json();
            console.log(link)
            if (link.code !== 'InvalidFormat'){
                return link.shortUrl;
            } else{
                alert(link.errors[0].message)
                return
            }
            
        }
        catch(error){
            alert(error)
        }
    }
    async function shortenUrl(){
        if(data.current.value.trim().length !== 0){
            const apiData = await getApiData(data.current.value);
            if (apiData !== undefined){
                localStorage.setItem(data.current.value, apiData);
                setEmptyStyle(false);
            }
        } else{
            setEmptyStyle(true);
        }
    }

    function copyText(text){
        navigator.clipboard.writeText(text)
            .then(() => {
                setButtonValue({[text]: "Copied!" });
            })
    }

    console.log(buttonValue)
    return(
        <>
            <section className='section'>
                <div className='search'>
                    <div>
                        <input ref={data} type='text' className={`${emptyStyle === true ? 'empty' : 'input'}`} placeholder='Shorten a link' />
                        <p className={`${emptyStyle === true ? 'mobile' : 'p'}`} >Please add a link</p>
                    </div>
                    <button className='send' onClick={shortenUrl}>Shorten it!</button>
                    <p className={`${emptyStyle === true ? 'desktop' : 'p'}`} >Please add a link</p>
                </div>
            </section>
            <section className='stat'>
                <div className='links-container'>
                    {
                        (Object.keys(allItems).length !== 0) ? (
                            Object.keys(allItems).map((key) => (
                            <div key={key} className='links'>
                                <div className='oldLink'>
                                    <p>{key}</p>
                                </div>
                                <div className='newLink'>
                                    <p>{allItems[key]}</p>
                                    <button onClick={() => copyText(allItems[key])}
                                        className={
                                            buttonValue[allItems[key]] === "Copied!"
                                            ? 'copied'
                                            : 'Copy'
                                        }
                                        >
                                        {buttonValue[allItems[key]] || 'Copy'}
                                        </button>
                                </div>
                            </div>
                            ))
                        ) : null
                    }
                </div>
                <div className='statText'>
                    <h3>Advanced Statistics</h3>
                    <p>Track how your links are performing across the web with our 
                        advanced statistics dashboard.</p>
                </div>
                <div className='cards-container'>
                    <div className='cards one'>
                        <div>
                            <img src={brand} alt=''></img>
                        </div>
                        <h4>Brand Recognition</h4>
                        <p>Boost your brand recognition with each click. Generic links don’t 
                            mean a thing. Branded links help instil confidence in your content.</p>
                    </div>
                    <div className='chain'></div>
                    <div className='cards two'>
                        <div>
                            <img src={records} alt=''></img>
                        </div>
                        <h4>Detailed Records</h4>
                        <p>Gain insights into who is clicking your links. Knowing when and where 
                            people engage with your content helps inform better decisions.</p>
                    </div>
                    <div className='chain'></div>
                    <div className='cards three'>
                        <div>
                            <img src={customize} alt=''></img>
                        </div>
                        <h4>Fully Customizable</h4>
                        <p>Improve brand awareness and content discoverability through customizable 
                            links, supercharging audience engagement.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Shorten