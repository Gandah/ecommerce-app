// app/success/page.tsx
"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { TbShoppingCartX } from "react-icons/tb";


const Cancel = () => {

useEffect(() => {
    localStorage.clear();

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
                <button type="button"  className="btn btn_w">
                    Continue Shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Cancel