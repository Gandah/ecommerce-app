"use client";

import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { Cart } from './';
import { useStateContextProvider } from '@/Context/StateContext';


const NavBar = () => {

  const {setShowCart, showCart, totalQuantities}  = useStateContextProvider();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          <img
            width={100} 
            height={100}
            src='/electrix-logo.webp'
            className="logo_img"
            alt="Electrix logo"
          />
        </Link>
      </p>
      <button type="button"
      className="cart-icon"
      onClick={() => setShowCart(prevValue => !prevValue)}
      >
        <span className="cart-item-qty">{totalQuantities}</span>
        <AiOutlineShopping />
        
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default NavBar;