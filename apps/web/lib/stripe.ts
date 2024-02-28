// 'use server'
// import {
//   Currency,
// } from '@/__generated__/graphql'
// import { fees } from '@/lib/constants'
// import { ROUTES } from '@/lib/router/routes'
// import {
//   getPriceServiceFee,
//   getPriceWithoutHostFees,
//   getSpaceTitle,
// } from '@/lib/spaces'
// import getStripe from '@/lib/stripe'
//
// export async function checkout(space: string, from: number, to: number, guests: string) {
//   const stripe = getStripe()
//   const checkout = await stripe.checkout.sessions.create({
//     customer_email: user.email,
//
//     line_items: [
//       {
//         price_data: {
//           unit_amount: Math.round(totalDaysCost * 100),
//           product_data: {
//             name: `${getSpaceTitle(spaceData)} - ${spaceData.host.company}`,
//             images: spaceData.images || [],
//             description: `${spaceData.location?.address}. ${startDate.toDateString()} ${
//               startDate.toDateString() !== endDate.toDateString()
//                 ? ' - ' + endDate.toDateString()
//                 : ''
//             }. ${guests} Guests`,
//           },
//           currency: spaceData.host.currency || Currency.Sek,
//           // tax_behavior: 'inclusive',
//         },
//         tax_rates: [process.env.STRIPE_TAX_RATE!],
//         quantity: 1,
//       },
//       {
//         price_data: {
//           unit_amount: Math.round(getPriceServiceFee(totalDaysCost) * 100),
//           product_data: {
//             name: `Service Fee`,
//             description: `We charge a service fee of ${fees.guest * 100}%.`,
//           },
//           currency: spaceData.host.currency || Currency.Sek,
//           // tax_behavior: 'inclusive',
//         },
//         tax_rates: [process.env.STRIPE_TAX_RATE!],
//         quantity: 1,
//       },
//     ],
//     // automatic_tax: {
//     //   enabled: true,
//     // },
//     invoice_creation: {
//       enabled: true,
//     },
//     payment_intent_data: {
//       receipt_email: user.email,
//       // application_fee_amount:
//       //   spaceData.price * days * (fees.guest + (1 + fees.guest) * fees.vat + fees.host) * 100,
//       transfer_data: {
//         destination: spaceData.host.stripeAccount,
//         amount: Math.round(getPriceWithoutHostFees(totalDaysCost)) * 100,
//       },
//     },
//     client_reference_id: booking.data.addBooking,
//     metadata: {
//       booking: booking.data.addBooking,
//     },
//     mode: 'payment',
//     success_url:
//       process.env.AUTH0_BASE_URL + ROUTES.BOOKINGS_ROUTE + booking.data.addBooking || '/',
//   })
//   return checkout.url
// }
