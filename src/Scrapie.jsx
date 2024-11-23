import React from 'react';
import {useState, useEffect} from 'react';

function Scrapie() {
    const [scrape, setScrape] = useState("");
    const [url, setUrl] = useState("");
    const [desc, setDesc] = useState("");
    const [visibility, setVisibility] = useState(false);
    const getScrapeData = async()=>{
        try {
            const response = await fetch(`http://localhost:5000/scrape?url=${url}&desc=${desc}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setScrape(data.response);
            setVisibility(true);
        } catch (error) {
            console.error('Error fetching data:', error);
            setScrape('Failed to load data');
        }
    }

    return(
        <div className='p-5 items-center justify-center text-center space-y-5'>
            <div>
                <label>Enter URL here👇</label><br />
                <input type='text' onChange={(e)=>{setUrl(e.target.value)}} value={url}></input>
            </div>
            <div>
                <label>Enter description here👇(Optional)</label><br />
                <input type='text' onChange={(e)=>{setDesc(e.target.value)}} value={desc}></input>
            </div>
            <div>
                <button onClick={getScrapeData} className='btn text-white py-3 px-7 rounded-full'>Scrape</button>
            </div>
            <div className={visibility?'flex':'hidden'}>
                <h1>{scrape}</h1>
            </div>
        </div>
    );
}

export default Scrapie;