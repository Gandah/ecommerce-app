// app/success/page.tsx
"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { TbShoppingCartX } from "react-icons/tb";

import { useStateContextProvider } from '@/Context/StateContext';

const Cancel = () => {

    const { setCartItems, 
        setTotalPrice, 
        setTotalQuantities } = useStateContextProvider();


useEffect(() => {
    localStorage.clear();
    // setCartItems([]);
    // setTotalPrice(0);
    // setTotalQuantities(0);

}, []);


  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='cancel-checkout'>
                <TbShoppingCartX />
            </p>
            <h2>Order Failed</h2>
            <p className="email-msg">The order was not was not placed successfully. Please try again.</p>
        
            <Link href="/">
                <button type="button" width="300px" className="btn">
                    Continue Shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Cancel