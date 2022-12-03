const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: true,
		},
		categories: {
			type: Array,
			required: true,
		},
		options: {
			type: Array,
		},
		price: {
			type: Number,
			required: true,
		},
		stock: {
			type: Number,
			default: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
