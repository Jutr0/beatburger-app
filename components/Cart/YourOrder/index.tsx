import React from "react";
import Button from "../../Button";
import Price from "../../Price";
import CartProduct from "./CartProduct";

import styles from "./YourOrder.module.scss";

function YourOrder() {
	return (
		<div className={styles.container}>
			<h2>Twoje zamówienie</h2>
			<div className={styles.productsContainer}>
				<CartProduct />
				<CartProduct />
				<CartProduct />
				<CartProduct />
			</div>
			<div className={styles.sumContainer}>
				<span>Razem</span> <Price full={71} point={10} />
			</div>
		</div>
	);
}

export default YourOrder;
