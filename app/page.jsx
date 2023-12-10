// app/page.tsx
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';



async function fetchProducts() {
    try
    {
      const query = '*[_type == "product"]';
      const products = await client.fetch(query);
      return products;
    }catch (error) {
      console.error('Error fetching product data:', error);
    }
}

async function fetchBanner() {
    try {
      const bannerQuery = '*[_type == "banner"]';
      const bannerData = await client.fetch(bannerQuery);
      return bannerData;
    } catch (error) {
      console.error('Error fetching banner data:', error);
    }
  }


export default async function Home() {
    const bannerData = await fetchBanner();
    const products = await fetchProducts();
    

  return (
       <section>
        <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
        <div className="text-center my-10 mx-0  text-blueberryPie">
          <h2 className="text-4xl font-[800]">Best Seller Products</h2>
          <p className="text-base font-[200]">The best deals, right at your fingertips</p>
        </div>

        <div className="products-container">
          {products?.map((product) => <Product key={product._id} product={product} />)}
        </div>

        <FooterBanner footBanner={bannerData && bannerData[0]}/>
    </section>
  )
}

