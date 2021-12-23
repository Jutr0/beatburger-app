import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import Price from "../../Price";
import CartProduct from "./CartProduct";

import styles from "./YourOrder.module.scss";

function YourOrder() {
	const cart = useAppSelector((state) => state.cart);

	return (
		<div className={styles.container}>
			<h2>Twoje zamówienie</h2>
			<div className={styles.productsContainer}>
				{cart.orders &&
					cart.orders.length !== 0 &&
					cart.orders.map((order) => <CartProduct key={order.id} {...order} />)}
			</div>
			<div className={styles.sumContainer}>
				<span>Razem</span> <Price {...cart.sumPrice} />
			</div>
		</div>
	);
}

export default YourOrder;
