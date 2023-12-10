import Link from "next/link";
import { urlFor } from "@/lib/client";


const Product = ({product : {image, name, price, slug }}) => {
  "use client";
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <figure className="product-card">
          <img src={urlFor(image && image[0]).url()} alt={name}
          width={250}
          height={250}
          className="product-image"
          />
          <figcaption className="product-name">{name}</figcaption>
          <figcaption className="product-price">${price}</figcaption>
        </figure>
      </Link>
    </div>
  )
}

export default Product