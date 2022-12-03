import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter as Router} from "react-router-dom";
import App from "./App";
import { loadStripe } from "@stripe/stripe-js";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";

const stripePromise = loadStripe('pk_test_51LuXLrASwJIjPphyjwM8yRgeGYMUGaIdGe0oaRus0dMbS9XbRQ5vCOKnPX4ZIOtog6AVRrG2vXsZGRIS0FFQM27m00Nvr8XIqU');

ReactDOM.render(
	<Router>
		<Auth0ProviderWithHistory>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Auth0ProviderWithHistory>
	</Router>,
	document.getElementById("root")
);
