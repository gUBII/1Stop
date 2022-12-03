const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {getProduct} = require('./product')

router.post("/", async (req, res) =>{
	const domainUrl = process.env.WEB_APP_URL;
	// const userID = req.body.userID
	const cart = req.body;

	//check req body has line items
	if (!cart) {
		return res
			.status(400)
			.json({ error: "missing required session parameters" });
	}

	const customer = await stripe.customers.create({
		metadata:{
			// userID,
			cart: JSON.stringify(cart)
		}
	})
	const storeItems = await Promise.all(cart.map(async item =>{
		const itemDetail = await getProduct(item._id)
		return{
			price_data:{
				currency: 'aud',
				product_data:{
					name: itemDetail.title,
					images: [itemDetail.img]
				},
				unit_amount: itemDetail.price*100,
			},
			quantity: item.quantity,
		}
	}))

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			shipping_address_collection: { allowed_countries: ["AU", "NZ", "US"] },
			line_items: storeItems,
			customer: customer.id,
			success_url: `${domainUrl}/success`,
			// success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${domainUrl}/cancel`,
		});

		res.send({url: session.url});
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.json({ error: " An error occured, unable to create session" });
	}
})
module.exports = router;
