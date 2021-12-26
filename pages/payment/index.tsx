import React from "react";
import { Container } from "react-grid-system";
import MyForm from "../../components/MyForm";
function Payment() {
	return (
		<Container fluid={true} xs sm md component="main">
			<MyForm />
		</Container>
	);
}

export default Payment;
