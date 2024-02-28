// import type { NextRequest } from "next/server";
// import getStripe from "../../../lib/stripe";
//
// export async function POST(req: NextRequest) {
//   const payload = await req.text();
//
//   const sig = req.headers.get("stripe-signature");
//   let event;
//   const endpointSecret = process.env.WEBHOOK_SECRET_LOCAL;
//   try {
//     const stripe = getStripe();
//     event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//   } catch (error) {
//     console.error(error);
//     return new Response(`Webhook error: ${error}`, {
//       status: 400,
//     });
//   }
//   switch (event.type) {
//     case "checkout.session.completed": {
//       const checkoutSessionCompleted = event.data.object as any;
//       break;
//     }
//   }
//   return new Response("payment confirmation route received", {
//     status: 200,
//   });
// }
