const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("./routes/user");
const { product } = require("./routes/product");
const cart = require("./routes/cart");
const auth = require("./routes/auth");
const order = require("./routes/order");
const search = require("./routes/search");
const checkOut = require("./routes/checkout");
const stripe = require("./routes/stripe");
const cors = require("cors");

const databaseConnect = () => {
	mongoose
		.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Mongodb Database Connected");
		})
		.catch((error) => {
			console.log(error);
		});
};

app.use(cors());

app.use("/stripe", stripe);

app.use(express.json());
app.use("/auth", auth);
app.use("/api/users", user);
app.use("/api/products", product);
app.use("/api/search", search);
app.use("/api/carts", cart);
app.use("/api/orders", order);

const PORT = process.env.PORT || 3001;

databaseConnect();

app.listen(PORT, function () {
	console.log(`Backend running on port: ${PORT}`);
});

app.use("/create-checkout-session", checkOut);
