"use client";
import { useEffect } from 'react';
import { useStateContextProvider } from "@/Context/StateContext";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const ButtonSection = ({ fetchedProduct }) => {

const { increaseQty, decreaseQty, qty, onAdd, setQty, setShowCart} = useStateContextProvider();
 
useEffect(
  //resets quantity to 1 with each product page visit
  () => {
    setQty(1)
} , [])

const handleBuyNow = () => {
  onAdd(fetchedProduct, qty);

  setShowCart(true);
};

  return (
    <>
    <div className="quantity">
      <h3>Quantity:</h3>
      <div className="quantity-desc">
        <span className="minus"
         onClick={decreaseQty}
        ><AiOutlineMinus /></span>
        <span className="num">{qty}</span>
        <span className="plus"
         onClick={increaseQty}
        ><AiOutlinePlus /></span>
      </div>
    </div>
    <div className="buttons">
          <button type="button"
            className="add-to-cart"
            onClick={() => onAdd(fetchedProduct, qty)}
          >
            Add to Cart
          </button>
          <button type="button"
            className="buy-now"
            onClick={handleBuyNow}
          >
            Buy now
          </button>

        </div>
  </>
  )
}

export default ButtonSection;