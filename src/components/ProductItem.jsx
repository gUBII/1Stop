import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Card from "react-bootstrap/Card";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductItem({ product }) {
	const defaultOptions = {};
	product.options?.forEach((option) => {
		defaultOptions[option.optionTitle] = option.optionValues[0];
	});

	const { increaseCartQuantity } = useCart();

	const onAddToCart = (e) => {
		e.preventDefault();
		increaseCartQuantity(product, 1, defaultOptions);
	};

	return (
		<Card style={{ width: "14em" }} className="my-3 mx-auto">
			<Link to={`/products/${product._id}`} state={product}>
				<Card.Img
					style={{ width: "222px", height: "200px" }}
					src={product.img}
				/>
				<Card.Body>
					<div className="row">
						<Card.Title className="col-9 align-self-start">
							{product.title}
						</Card.Title>
						<FaShoppingCart
							style={{ width: "1.5em", height: "1.5em", color: "black" }}
							className="col align-self-end"
							onClick={onAddToCart}
						/>
					</div>
					<Card.Text>${product.price}</Card.Text>
				</Card.Body>
			</Link>
		</Card>
	);
}
