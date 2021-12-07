import React from "react";
import { ICart } from "../../assets/types/orders";
import { useAppSelector } from "../../redux/hooks";
import Price from "../Price";
import CartIcon from "../../assets/icons/cart_icon.svg";

import styles from "./Cart.module.scss";

function Cart() {
	const cart = useAppSelector((state) => state.cart);
	return (
		<>
			{cart.sumPrice.full > 0 && (
				<div className={styles.container}>
					<CartIcon />
					<span className={styles.title}>Twoje Zamówienie</span>
					<Price {...cart.sumPrice} />
				</div>
			)}
		</>
	);
}

export default Cart;
