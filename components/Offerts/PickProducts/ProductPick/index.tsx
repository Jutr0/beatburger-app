import React, { useEffect, useState } from "react";
import QuantityIndicator from "../../../QuantityIndicator";
import Image from "next/image";

import styles from "./ProductPick.module.scss";
import { IMealSize } from "../../../../assets/types/addons";
import Price from "../../../Price";
import { IPrice } from "../../../../assets/types/orders";
import ChangeQuantityButton from "../../../QuantityButtons/ChangeQuantityButton";
import QuantityButtons from "../../../QuantityButtons";

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
	price?: IPrice;
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
	price,
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
				<>
					{price && price.full > 0 && (
						<Price
							{...price}
							style={{ margin: "14px 0 " }}
							fullStyle={styles.fullPrice}
							pointStyle={styles.pointPrice}
							currencyStyle={styles.currency}
						/>
					)}
					{/* <div className={styles.buttons}>
						<ChangeQuantityButton onClick={decrement}>-</ChangeQuantityButton>
						<ChangeQuantityButton onClick={increment}>+</ChangeQuantityButton>
					</div> */}
					<QuantityButtons
						onIncrement={increment}
						onDecrement={decrement}
						className={styles.buttons}
					/>
				</>
			)}
		</div>
	);
}

export default ProductPick;
