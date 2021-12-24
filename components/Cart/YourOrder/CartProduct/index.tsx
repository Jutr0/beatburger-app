import React, { useEffect, useState } from "react";

import { IMinOffert, IPrice } from "../../../../assets/types/orders";
import { useAppDispatch } from "../../../../redux/hooks";
import {
	decreaseQuantity,
	increaseQuantity,
} from "../../../../redux/slices/cartSlice";
import Price from "../../../Price";
import QuantityButtons from "../../../QuantityButtons";

import styles from "./CartProduct.module.scss";

type IProps = IMinOffert;

function CartProduct({
	name,
	price,
	type,
	id,
	mainType,
	quantity,
	additionalProducts,
	drink,
	secondMeal,
}: IProps) {
	const dispatch = useAppDispatch();

	const [realPrice, setRealPrice] = useState<IPrice>({ full: 0, point: 0 });

	useEffect(() => {
		if (Array.isArray(price)) return;

		let tempFull = price.full * quantity!;
		let tempPoint = price.point * quantity!;

		tempFull += Math.floor(tempPoint / 100);
		tempPoint %= 100;
		setRealPrice({ full: tempFull, point: tempPoint });
	}, [quantity, price]);

	return (
		<div className={styles.container}>
			<div className={styles.infoContainer}>
				<div className={styles.title}>
					{quantity && quantity > 1 && quantity + "x "}
					{name}
				</div>
				<div className={styles.addonsContainer}>
					{secondMeal &&
						Array.isArray(secondMeal) &&
						secondMeal.map((step, i) => (
							<div key={step.name + i} className={styles.addon}>
								{step.title}
							</div>
						))}
					{secondMeal && !Array.isArray(secondMeal) && (
						<div className={styles.addon}>{secondMeal.title}</div>
					)}
					{drink &&
						Array.isArray(drink) &&
						drink.map((step, i) => (
							<div key={step.name + i} className={styles.addon}>
								{step.title}
							</div>
						))}
					{drink && !Array.isArray(drink) && (
						<div className={styles.addon}>{drink.title}</div>
					)}
					{additionalProducts &&
						additionalProducts.length !== 0 &&
						additionalProducts.map((product) => (
							<div key={product.name} className={styles.addon}>
								{product.quantity > 1 && product.quantity + "x "}
								{product.name}
							</div>
						))}
				</div>
			</div>
			<div className={styles.priceContainer}>
				<QuantityButtons
					onIncrement={() => {
						dispatch(increaseQuantity(id));
					}}
					onDecrement={() => {
						dispatch(decreaseQuantity(id));
					}}
					classNameButton={styles.buttons}
				/>
				<Price
					className={styles.price}
					fullStyle={styles.fullPrice}
					pointStyle={styles.pointPrice}
					currencyStyle={styles.currency}
					{...(realPrice as IPrice)}
				/>
			</div>
		</div>
	);
}

export default CartProduct;
