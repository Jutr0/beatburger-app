import React from "react";
import Price from "../../../Price";
import QuantityButtons from "../../../QuantityButtons";

import styles from "./CartProduct.module.scss";

function CartProduct() {
	return (
		<div className={styles.container}>
			<div className={styles.infoContainer}>
				<div className={styles.title}>2x Bacon Burger Zestaw</div>
				<div className={styles.addonsContainer}>
					<div className={styles.addon}>frytki</div>
					<div className={styles.addon}>pepsi ( 330ml )</div>
					<div className={styles.addon}>2x jalapeno</div>
				</div>
			</div>
			<div className={styles.priceContainer}>
				<QuantityButtons
					onIncrement={() => {}}
					onDecrement={() => {}}
					classNameButton={styles.buttons}
				/>
				<Price
					className={styles.price}
					fullStyle={styles.fullPrice}
					pointStyle={styles.pointPrice}
					currencyStyle={styles.currency}
					full={23}
					point={23}
				/>
			</div>
		</div>
	);
}

export default CartProduct;
