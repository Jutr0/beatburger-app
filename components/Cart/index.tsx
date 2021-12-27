import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { useAppSelector } from "../../redux/hooks";
import Price from "../Price";
import CartIcon from "../../assets/icons/cart_icon.svg";

import styles from "./Cart.module.scss";
import { Hidden, Visible } from "react-grid-system";
import YourOrder from "./YourOrder";
import Button from "../Button";

function Cart() {
	const cart = useAppSelector((state) => state.cart);
	const router = useRouter();
	return (
		<>
			<Hidden sm xs>
				<div className={styles.DC__container}>
					<Image
						src={
							"https://firebasestorage.googleapis.com/v0/b/beatburger-app.appspot.com/o/logo_465x320.webp?alt=media&token=b19e9c98-a4ed-430f-b163-deee381b937b"
						}
						alt="logo"
						layout="responsive"
						width="465"
						height="300"
					/>
					<div className={styles.address}>plac Tadeusza Kościuszki 23</div>
					<div className={styles.status}>Teraz otwarte</div>
					<select className={styles.deliveryType}>
						<option value="delivery">&#xf1b9; Dostawa</option>
						<option value="pickup">&#xf0f2; Odbiór</option>
						<option value="inRestaurant">&#xf0f5; Zjem na miejscu</option>
					</select>
					<YourOrder />
					<Button
						disabled={cart.sumPrice.full <= 0}
						className={styles.orderButton}
						onClick={() => {
							router.push("/payment");
						}}
					>
						Zamawiam
					</Button>
				</div>
			</Hidden>

			<Visible sm xs>
				{cart.sumPrice.full > 0 && (
					<div
						className={styles.container}
						onClick={() => {
							router.push("/payment");
						}}
					>
						<CartIcon />
						<span className={styles.title}>Twoje Zamówienie</span>
						<Price {...cart.sumPrice} />
					</div>
				)}
			</Visible>
		</>
	);
}

export default Cart;
