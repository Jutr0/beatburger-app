import React from "react";

import styles from "./Product.module.scss";

export type IProduct = {
	thumbnail: string;
	quantity: number;
	name: string;
};

type IProps = IProduct;

function Product({ thumbnail, quantity, name }: IProps) {
	return (
		<div className={styles.productItem}>
			<div
				className={styles.thumbnail}
				style={{ backgroundImage: "url(" + thumbnail + ")" }}
			>
				<div className={styles.quantity}>{quantity}x</div>
			</div>
			<div className={styles.title}>{name}</div>
		</div>
	);
}

export default Product;
