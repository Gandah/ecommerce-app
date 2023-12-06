"use client";

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { MdDeleteForever } from "react-icons/md";
import toast from 'react-hot-toast';

import { useStateContextProvider } from '@/Context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '@/lib/getStripe';


/*
  Things to fix
  *qunatity remains the same after moving to another product
  *After increasing/decreasing quantity of a given item, shifts downward 
  causing layout changes -bug fixed
  *Add a scrollbar to the cart 
  *animate cart drawer
  *Implement local storage
*/

const Cart = () => {

  const cartRef = useRef()

  const { totalPrice, totalQuantities,
    cartItems, setShowCart,
    toggleCartItemQty, removeCartItem, saveCartToLocalStorage } = useStateContextProvider();


  useEffect(
    () => {
      saveCartToLocalStorage(cartItems, totalPrice, totalQuantities);
      
    }
    , [cartItems, totalPrice, totalQuantities]);

  const handleCheckout = async () => {
    const stripe = await getStripe();

    //sends to cart items to the backend 
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems: cartItems,
        origin: window.location.origin
      }),
    });

    if (!response.ok) {
      throw new Error('Network Error');
    }

    if (response.statusCode === 500) return;
    const data = await response.json();
    console.table('body data:', data)
    toast.loading('Redirecting...');
    stripe.redirectToCheckout({ sessionId: data.session.id })

  }


  return (
    <div className="cart-wrapper" ref={cartRef}
    >
      <div className="cart-container">
        <button type="button"
          className="cart-heading"
          onClick={() => setShowCart(prevValue => !prevValue)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities}
            {totalQuantities === 1 ? " item" : " items"})</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button type="button" onClick={
                () => setShowCart(prevValue => !prevValue)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map(
            (item) => (

              <div className="product" key={item._id}>
                <img src={urlFor(item?.image[0]).url()}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>

                  <div className="flex bottom">
                    <div>
                      <div className="quantity-desc">

                        <span className="minus"
                          onClick={() =>
                            toggleCartItemQty(item._id, 'dec')}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num" >{item.quantity}</span>
                        <span className="plus"
                          onClick={() =>
                            toggleCartItemQty(item._id, 'inc')}
                        ><AiOutlinePlus /></span>

                      </div>
                    </div>
                    <button type="button"
                      className="remove-item"
                      onClick={() => removeCartItem(item._id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h4>${totalPrice}</h4>
            </div>
            <div className="btn-container">
              <button type="button" className="btn"
                onClick={handleCheckout}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart