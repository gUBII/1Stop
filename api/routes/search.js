//Use regex to search users for partical username match, returns matches
const router = require("express").Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
	try{
		const { query, sort} = req.query;
		const products = await Product.find({
		  title: { $regex: query, $options: "i" },
		}).sort(sortVal(sort));
		res.status(200).json(products);
	} catch(error) {
		res.status(500).json(error);
	}
  });

  const sortVal = (sort)=>{
    if(sort==='Low to High'){
        return {price: 1}
    }
    else{
        return{price:-1}
    }
  }

  module.exports = router;
