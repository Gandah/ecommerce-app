"use client";

import { urlFor } from "@/lib/client";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { useStateContextProvider } from '@/Context/StateContext';





export default function ProductSlider({ image, name }) {

  const { totalPrice, totalQuantities, 
    cartItems, saveCartToLocalStorage } = useStateContextProvider();

  useEffect(
    () => {
   
    saveCartToLocalStorage(cartItems, totalPrice, totalQuantities);
      }
, [cartItems, totalPrice, totalQuantities]);

  const [index, setIndex] = useState(0)

  return (
    <div>
      <div className="image-container">
            <Image 
            src={urlFor(image && image[index]).url()} 
            alt={name}
            width={400}
            height={400}
            priority={true}
            className="product-detail-image" />
      </div>
      <div className="small-images-container">
            {image?.map((item, i) => (
                <Image
                key={item._key}
                src={urlFor(item).url()}
                width={70}
                height={70}     
                className={i === index ?
                'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
                alt={name}
            />
            ))}
      </div>
    </div>
  )
}
