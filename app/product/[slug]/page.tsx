// app/product/page.tsx
import { Product, ProductSlider, ButtonSection } from "@/components";
import { client } from "@/lib/client";
import { useEffect } from "react";
import {  AiFillStar, AiOutlineStar } from 'react-icons/ai';


const fetchProductDetails = async (slug) => {
 
  try {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsRelatedQuery = '*[_type == "product"]';
    const product = await client.fetch(query, { 
      mode: 'no-cors'
   });
    const relatedProducts = await client.fetch(productsRelatedQuery);
    return {
      product,
      relatedProducts,
    };
  } catch (error) {
    console.error('Error fetching product data:', error);
    return {
      product: null,
      relatedProducts: [],
    };
  }
};


export default async function ProductDetails({ params }) {
  const { slug } = params;
  const { product: fetchedProduct, relatedProducts } = await fetchProductDetails(slug);

  if (!fetchedProduct) {
    return <div>Loading...</div>; // Handle the case when product data is loading
  }

  // Deconstruct product object to use its properties
  const { image, name, details, price } = fetchedProduct;
  

  return (
    <section>
      <div className="product-detail-container">       
        <ProductSlider image={image} name={name} />
        
        <div className="product_detail_desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div className="stars">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details</h4>
          <div className="details_section">
            <p >{details}</p>
          </div>
          <p className="price">${price}</p>
          <ButtonSection fetchedProduct={fetchedProduct} />
        </div>
        
      </div>
      <section className="maylike-products-wrapper">
          <h2>Recommended For You</h2>
          <div className="marquee">
            <div className="maylike_products_container track">
              {relatedProducts.map(
                (item) => (<Product key={item._id}
                  product={item} />)
                 )}
            </div>

          </div>
      </section>
    </section>
  );
};

export async function generateStaticParams() {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  return products.map((product) => (
    {
      slug: product.slug.current,
    }
  ));
}

