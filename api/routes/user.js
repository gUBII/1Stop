const router = require("express").Router();
const User = require("../models/User");
const { verifyTokenAuth, verifyTokenAdmin } = require("./verify");

//UPDATE
router.put("/:id", verifyTokenAuth, async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		const { password, ...userfields } = user._doc;
		res.status(200).json(userfields);
	} catch (error) {
		res.status(500).json(error);
	}
});

//DELETE
router.delete("/:id", verifyTokenAuth, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json(`User ID: ${req.params.id} deleted successfully`);
	} catch (error) {
		res.status(500).json(error);
	}
});

//GET
router.get("/:id", verifyTokenAuth, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...userfields } = user._doc;
		res.status(200).json(userfields);
	} catch (error) {
		res.status(500).json(error);
	}
});

//GET ALL
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
