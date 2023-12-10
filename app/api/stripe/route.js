import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);


export async function POST(req, res){
  "use server"
    const shippingRate = await stripe.shippingRates.create({
        display_name: 'Ground shipping',
        type: 'fixed_amount',
        fixed_amount: {
          amount: 500,
          currency: 'usd',
        },
   
      });
      
  if (req.method === 'POST') {
    
    const body =  await req.json();
    console.log(body)

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',

        shipping_options: [
            {
              shipping_rate: shippingRate.id,
            },
          ],
        line_items: body.cartItems.map(
          (item) => {
              const img =  item.image[0].asset._ref;
              const newImg = img.replace('image-',
               'https://cdn.sanity.io/images/ry4c3w9f/production/').replace(
                '-webp', '.webp'
               )

              return {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: item.name,
                    images: [newImg],
                  },
                  unit_amount: item.price * 100,
                },
                adjustable_quantity: {
                  enabled: true,
                  minimum: 1,
                }, 
                quantity: item.quantity

              }
          }
        ),
        mode: 'payment',
        success_url: `${body.origin}/success`,
        cancel_url: `${body.origin}/canceled`,
      });

      return Response.json(
        {
          session,
        },
        {
          status: 200,
        }
      );
      // res.status(200).json(session)
    } catch (err) {
      // res.status(err.statusCode || 500).json(err.message);
      return Response.json(
        { success: false, message: err.message },
        { status: err.statusCode || 500 }
      )
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}