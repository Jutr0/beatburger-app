import React from "react";

import styles from "./Product.module.scss";

export type IProduct = {
	thumbnail: string;
	quantity: number;
	name: string;
	onClick?: Function;
	className?: string;
	color?: string;
};

type IProps = IProduct;

function Product({
	thumbnail,
	quantity,
	name,
	onClick,
	className,
	color,
}: IProps) {
	return (
		<div
			className={`${styles.productItem} ${className}`}
			onClick={() => onClick && onClick()}
		>
			<div
				className={styles.thumbnail}
				style={{ backgroundImage: "url(" + thumbnail + ")" }}
			>
				{quantity > 0 && <div className={styles.quantity}>{quantity}x</div>}
			</div>
			<div className={styles.title} style={{ color }}>
				{name}
			</div>
		</div>
	);
}

export default Product;
