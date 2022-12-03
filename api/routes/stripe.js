const express = require("express");
const router = express.Router()
const Order = require("../models/Order");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const {EmailSender} = require('../EmailSender.js')
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
 
router.post('/webhook',express.raw({type: "*/*"}), (request, response) => {
  let event
  const sig = request.headers['stripe-signature'];
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log(err)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  //add order details to database
  const handleNewOrder = async (data, cart)  =>{

    let products = cart.map(item => {
      return{
        productId: item._id,
        quantity: item.quantity
      }   
    })
      const formattedOrder = {
        amount: data.amount_total/100,
        address: data.shipping_details.address,
        email : data.customer_details.email, 
        name: data.customer_details.name,
        products
    } 
      console.log("creating");
      const order = new Order(formattedOrder);
      const saved = await order.save();

    }
  // Handle the event
  if (event.type === 'checkout.session.completed') {
    stripe.customers.retrieve(event.data.object.customer)
    .then((customer) => {
        console.log(customer)
        let cart = JSON.parse(customer.metadata.cart)
        handleNewOrder(event.data.object, cart)
        EmailSender(event.data.object, cart);
      })
    
    
      console.log('data:', event.data.object);
    
  }    

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
module.exports = router;