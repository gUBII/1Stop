const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken, verifyTokenAuth, verifyTokenAdmin } = require("./verify");

//CREATE
router.post("/", verifyToken, async (req, res) => {
	const order = new Order(req.body);
	try {
		const saved = await order.save();
		res.status(200).json(saved);
	} catch (error) {
		res.status(500).json(error);
	}
});

//UPDATE
router.put("/:id", verifyTokenAdmin, async (req, res) => {
	try {
		const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json(updated);
	} catch (error) {
		res.status(500).json(error);
	}
});

//DELETE
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id);
		res.status(200).json(`Order ID: ${req.params.id} deleted successfully`);
	} catch (error) {
		res.status(500).json(error);
	}
});

//GET USER ORDER
router.get("/:id", verifyTokenAuth, async (req, res) => {
	try {
		const orders = await Order.find({ userId: req.params.id });
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json(error);
	}
});

//GET ALL
router.get("/", async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
