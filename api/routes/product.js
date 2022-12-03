const product = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAdmin } = require("./verify");

//CREATE
// ADMIN PROTECTED
product.post("/", async (req, res) => {
	console.log("creating");
	const product = new Product(req.body);
	try {
		const saved = await product.save();
		res.status(200).json(saved);
	} catch (error) {
		res.status(500).json(error);
	}
});

//UPDATE
// ADMIN PROTECTED
product.put("/:id", async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json(error);
	}
});

//DELETE
// ADMIN PROTECTED
product.delete("/:id", async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json(`Product ID: ${req.params.id} deleted successfully`);
	} catch (error) {
		res.status(500).json(error);
	}
});

//GET PRODUCT
product.get("/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json(error);
	}
});

//GET ALL PRODUCTS
product.get("/", async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json(error);
	}
});

const getProduct = async (id) => {
	const product = await Product.findById(id);
	return product
}

module.exports = {product, getProduct }
