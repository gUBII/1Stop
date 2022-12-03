const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	console.log(req.header)
	const token = req.headers.authorization?.split(" ")[1];
	console.log(token);
	if (token) {
		jwt.verify(token, "secret", (err, user) => {
			if (err) {
				return res.status(403).json("Not valid.");
			}
			console.log("verified");
			req.user = user;
			next();
		});
	} else {
		return res.status(401).json("Not authenticated.");
	}
};

const verifyTokenAuth = (req, res, next) => {
	verifyToken(req, res, () => {
		console.log(req.params);
		if (req.user.email === req.params.email || req.user.admin) {
			next();
		} else {
			return res.status(403).json("Not authorized.");
		}
	});
};

const verifyTokenAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.admin) {
			next();
		} else {
			return res.status(403).json("Not authorized.");
		}
	});
};

module.exports = {
	verifyTokenAdmin,
	verifyTokenAuth,
	verifyToken,
};
