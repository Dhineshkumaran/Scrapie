import React from 'react';
import Pie from './assets/App.svg';
import {useState, useEffect} from 'react';

function Navbar() {
    return(
        <nav className='h-20 bg-orange-100 w-[100vw] flex'>
            <img src={Pie} alt='logo' width={100} height={100}></img>
            <h1 className='font-bold text-2xl p-5' style={{color:'#1d1e78'}}>Scrapie</h1>
        </nav>
    );
}
// 🍓🫐🍒

export default Navbar;