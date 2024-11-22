import React from 'react';
import {useState, useEffect} from 'react';

function App() {
    const [scrape, setScrape] = useState("");
    useEffect(()=>{
        async function getScrapeData(){
            try {
                const url = 'https://collegedunia.com/exams';
                const response = await fetch(`http://localhost:5000/scrape?url=${url}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setScrape(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setScrape('Failed to load data');
            }
        }
        getScrapeData();
    }, []);

    return(
        <h1>{scrape}</h1>
    );
}

export default App;