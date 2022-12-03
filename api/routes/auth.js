require("dotenv").config();
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyTokenAuth, verifyTokenAdmin } = require("./verify");

router.get("/", verifyTokenAdmin, async (req, res) => {
	try {
		res.status(200).json("Verified");
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/token", async (req, res) => {
	const email = req.body.email;
	if (email) {
		try {
			const user = await User.find({ email: email });
			const token = jwt.sign(
				{
					id: user[0].id,
					admin: user[0].admin,
				},
				"secret",
				{ expiresIn: "1d" }
			);
			res.status(200).json({ token });
		} catch (error) {
			res.status(500).json(error);
		}
	}
});

//Register user
// router.post("/register", async (req, res) => {
// 	bcrypt.genSalt(10, function (err, salt) {
// 		bcrypt.hash(req.body.password, salt, async function (err, hash) {
// 			const user = new User({
// 				username: req.body.username,
// 				email: req.body.email,
// 				password: hash,
// 			});
// 			const returned = await user.save().catch((err) => {
// 				res.status(401).json(err);
// 			});

// 			if (returned) {
// 				if (user._id) {
// 					const token = jwt.sign(
// 						{
// 							id: user._id,
// 							admin: user.admin,
// 						},
// 						"secret",
// 						{ expiresIn: "1d" }
// 					);
// 					res.status(200).json({ user, token });
// 				}
// 			}
// 		});
// 	});
// });

// router.post("/login", async (req, res) => {
// 	try {
// 		const user = await User.findOne({ email: req.body.email });
// 		const password = req.body.password;
// 		if (user) {
// 			bcrypt.compare(password, user.password, function (err, result) {
// 				if (result) {
// 					const token = jwt.sign(
// 						{
// 							id: user._id,
// 							admin: user.admin,
// 						},
// 						"secret",
// 						{ expiresIn: "1d" }
// 					);
// 					const { password, ...userfields } = user;
// 					res.status(200).json({
// 						userfields,
// 						token,
// 					});
// 				} else {
// 					res.status(401).json("No matching user");
// 				}
// 			});
// 		} else {
// 			res.status(401).json("No matching user");
// 		}
// 	} catch (error) {
// 		res.status(500).json(error);
// 	}
// });

module.exports = router;
