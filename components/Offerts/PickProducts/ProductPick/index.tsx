import React, { useEffect, useState } from "react";
import QuantityIndicator from "../../../QuantityIndicator";
import Image from "next/image";

import styles from "./ProductPick.module.scss";
import { IMealSize } from "../../../../assets/types/addons";

type IProps = {
	thumbnail: string;
	name: string;
	maxNumber: number;
	type?: "one" | "many";
	isChecked?: boolean;
	onClick?: Function;
	onIncrement?: Function;
	onDecrement?: Function;
	leftNumber?: number;
	size?: IMealSize;
};

function ProductPick({
	thumbnail,
	name,
	maxNumber,
	type = "many",
	isChecked,
	onClick,
	onDecrement,
	onIncrement,
	leftNumber = 1,
}: IProps) {
	const [quantity, setQuantity] = useState(0);

	useEffect(() => {
		type === "one" && setQuantity(0);
	}, [type]);

	const increment = () => {
		if (quantity === maxNumber) return;
		if (leftNumber === 0) return;
		onIncrement && onIncrement();
		setQuantity((quantity) => quantity + 1);
	};

	const decrement = () => {
		if (quantity === 0) return;
		onDecrement && onDecrement();
		setQuantity((quantity) => quantity - 1);
	};

	return (
		<div
			className={`${styles.container} ${
				type === "one" && isChecked ? styles.active : ""
			}`}
			onClick={() => onClick && onClick()}
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
