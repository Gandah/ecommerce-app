// app/success/page.tsx
"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContextProvider } from '@/Context/StateContext';
// import runfireWorks from '@/lib/util';

const Success = () => {

    const { setCartItems, 
        setTotalPrice, 
        setTotalQuantities } = useStateContextProvider();


useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    // runfireWorks()
}, []);


  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>Thank you for your order!</h2>
            <p className="email-msg">Check your email inbox for the receipt.</p>
            <p className="description">
            If you have any questions, please email
            <Link className="email" href="mailto:ganderson.eddy@gmail">
                ganderson.eddy@gmail
            </Link>
            </p>
            <Link href="/">
                <button type="button"  className="btn btn_w">
                    Continue Shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success;