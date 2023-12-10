"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// Create a context object
const Context = createContext();

export const StateContextProvider = ({ children }) => {
  useEffect(() => {
    // Ensures localStorage is accessed only on client side
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  }, []);

  const initializeState = (key, defaultValue) => {
    // Check if code is running in browser environment
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    }
    return defaultValue;
  };
  
  const [showCart, setShowCart] = useState(false);
  // Initialize your states with the helper function
  const [cartItems, setCartItems] = useState(
    () => initializeState("cartData", []).cartItems || []
  );
  const [totalPrice, setTotalPrice] = useState(
    () => initializeState("cartData", { totalPrice: 0 }).totalPrice
  );
  const [totalQuantities, setTotalQuantities] = useState(
    () => initializeState("cartData", { totalQuantities: 0 }).totalQuantities
  );
  const [qty, setQty] = useState(1);

  function saveCartToLocalStorage(cartItems, totalPrice, totalQuantities) {
    if (typeof window !== 'undefined') {
      const cartData = {
        cartItems,
        totalPrice,
        totalQuantities,
      };
      localStorage.setItem('cartData', JSON.stringify(cartData));
    }
  }
  

  const onAdd = (product, quantity) => {
    //adds items to cart and updates quantity
    //returns the new cart items
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    saveCartToLocalStorage(cartItems, totalPrice, totalQuantities);
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const removeCartItem = (id) => {
    // First find the product to get its details for total calculations
    const foundProduct = cartItems.find((item) => item._id === id);

    if (foundProduct) {
      // Update the cart items
      setCartItems((currentCartItems) =>
        currentCartItems.filter((item) => item._id !== id)
      );

      // Use a callback to ensure we have the latest state
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - foundProduct.price * foundProduct.quantity
      );
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
      );
    }
    saveCartToLocalStorage(cartItems, totalPrice, totalQuantities);
  };

  const toggleCartItemQty = (id, value) => {
    //Increases or decreases quantity of items
    let foundProduct = cartItems.find((item) => item._id === id);

    if (!foundProduct) {
      // Handle the case where the product is not found
      return;
    }

    setCartItems((currentCartItems) => {
      return currentCartItems.map((item) => {
        if (item._id === id) {
          let updatedQuantity = item.quantity;
          if (value === "inc") {
            updatedQuantity++;
          } else if (value === "dec" && item.quantity > 1) {
            updatedQuantity--;
          }

          return { ...item, quantity: updatedQuantity };
        }
        return item;
      });
    });

    // Update total price and quantities
    if (value === "inc") {
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec" && foundProduct.quantity > 1) {
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
    }

    saveCartToLocalStorage(cartItems, totalPrice, totalQuantities);
  };

  const increaseQty = () => {
    //increases shopping item quantity
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    //decreases shopping item quantity
    //returns 1 if its less than 1
    setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        setQty,
        increaseQty,
        decreaseQty,
        onAdd,
        toggleCartItemQty,
        removeCartItem,
        saveCartToLocalStorage,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Export the context and a hook to consume the context
export const useStateContextProvider = () => useContext(Context);
