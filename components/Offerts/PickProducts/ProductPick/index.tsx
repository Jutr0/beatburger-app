import React, { useEffect, useState } from "react";
import QuantityIndicator from "../../../QuantityIndicator";
import Image from "next/image";

import styles from "./ProductPick.module.scss";

type IProps = {
	thumbnail: string;
	name: string;
	maxNumber: number;
	type?: "one" | "many";
	isChecked?: boolean;
	onClick?: Function;
};

function ProductPick({
	thumbnail,
	name,
	maxNumber,
	type = "many",
	isChecked,
	onClick,
}: IProps) {
	const [quantity, setQuantity] = useState(0);

	const increment = () => {
		if (quantity === maxNumber) return;
		setQuantity((quantity) => quantity + 1);
	};

	const decrement = () => {
		if (quantity === 0) return;
		setQuantity((quantity) => quantity - 1);
	};

	return (
		<div
			className={`${styles.container} ${
				type === "one" && isChecked ? styles.active : ""
			}`}
			onClick={(_) => onClick && onClick()}
		>
			<QuantityIndicator quantity={quantity} />
			<div className={styles.thumbnail}>
				<Image src={thumbnail} alt="product" layout="fill" />
			</div>
			<h2>{name}</h2>

			{type === "many" && (
				<div className={styles.buttons}>
					<button className={styles.decrement} onClick={() => decrement()}>
						-
					</button>
					<button className={styles.increment} onClick={() => increment()}>
						+
					</button>
				</div>
			)}
		</div>
	);
}

export default ProductPick;
