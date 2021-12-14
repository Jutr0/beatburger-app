import React, { useEffect, useState } from "react";

import product from "../../../assets/images/bekon.png";
import { IMealSize, ISecondMeal } from "../../../assets/types/addons";
import { IMinOffert, IPrice } from "../../../assets/types/orders";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	addAdditionalIngridient,
	addDrink,
	addSecondMeal,
	changeDrinkNumber,
	changeSecondMealNumber,
	removeAdditionalIngridient,
	removeDrink,
	removeSecondMeal,
	setDrink,
	setSecondMeal,
	setSize,
	setSumPrice,
} from "../../../redux/slices/addonSlice";
import Button from "../../Button";
import InputCheck from "../../InputCheck";
import ProductPick from "./ProductPick";

import styles from "./PickProducts.module.scss";
import AddIcon from "../Offert/plus-svgrepo-com.svg";
import { addToCart } from "../../../redux/slices/cartSlice";
import Price from "../../Price";

type IProps = {
	name: string;
	price: IPrice[] | IPrice;
	onClose: Function;
};

function PickProducts({ name, price, onClose }: IProps) {
	const dispatch = useAppDispatch();
	const addons = useAppSelector((state) => state.addons);

	const maxPickedSecondMeal = 2;
	const maxPickedDrinkNumber = 2;

	const onPickOption = (callback: Function, name: string) => {
		if (addons.size !== "beatest") {
			dispatch(callback(name));
		}
	};

	const onAddToCart = () => {
		if (
			addons.type === "zestaw" &&
			(!addons.drink || !addons.secondMeal || !addons.size)
		) {
			alert("Wybierz frytki lub napój lub rozmiar zestawu!");
			return;
		}

		const temp: IMinOffert = {
			name,
			price: addons.sumPrice,
			additionalProducts: addons.additionalIngridients.filter(
				(step) => step.quantity > 0
			),
			type: addons.type,
			quantity: 1,
			id: Date.now().toString(),
			secondMeal: addons.secondMeal,
			drink: addons.drink,
		};

		dispatch(addToCart(temp));

		onClose();
	};
	useEffect(() => {
		calculateSum();
	}, [addons.size, addons.additionalIngridients]);

	const calculateSum = () => {
		let full: number = 0;
		let point: number = 0;
		if (!Array.isArray(price)) {
			full += price.full;
			point += price.point;
		} else {
			switch (addons.size) {
				case "beat":
					full += price[0].full;
					point += price[0].point;

					break;
				case "beater":
					full += price[1].full;
					point += price[1].point;
					break;
				case "beatest":
					full += price[2].full;
					point += price[2].point;
					break;
			}
		}

		addons.additionalIngridients.forEach((step) => {
			full += step.price.full * step.quantity;
			point += step.price.point * step.quantity;
		});

		full += Math.floor(point / 100);
		point = point % 100;

		dispatch(setSumPrice({ full, point }));
	};

	return (
		<div className={styles.container}>
			{addons.type === "zestaw" && (
				<>
					<div className={styles.mealSize}>
						<h1>Wybierz rozmiar zestawu</h1>
						<InputCheck
							value="BEAT"
							onClick={() => {
								dispatch(setSize("beat"));
							}}
							isChecked={addons.size === "beat"}
							style={{ fontWeight: 200 }}
						/>
						<InputCheck
							value="BEATER"
							onClick={() => {
								dispatch(setSize("beater"));
							}}
							isChecked={addons.size === "beater"}
							style={{ fontWeight: 500 }}
						/>
						<InputCheck
							value="BEATEST"
							onClick={() => {
								dispatch(setSize("beatest"));
							}}
							isChecked={addons.size === "beatest"}
							style={{ fontWeight: 700 }}
						/>
					</div>
					<div className={styles.pickOne}>
						<h1>Wybierz frytki lub sałatkę</h1>
						<div className={styles.products}>
							<ProductPick
								thumbnail={product.src}
								isChecked={addons.secondMeal === "fries"}
								name="Fytki"
								maxNumber={maxPickedSecondMeal}
								leftNumber={maxPickedSecondMeal - addons.pickedSecondMealNumber}
								onClick={() => {
									onPickOption(setSecondMeal, "fries");
								}}
								onIncrement={() => {
									dispatch(changeSecondMealNumber(1));
									dispatch(addSecondMeal("fries"));
								}}
								onDecrement={() => {
									dispatch(changeSecondMealNumber(-1));
									dispatch(removeSecondMeal("fries"));
								}}
								type={addons.size === "beatest" ? "many" : "one"}
							/>
							<ProductPick
								thumbnail={product.src}
								isChecked={addons.secondMeal === "salad"}
								name="Sałatka"
								type={addons.size === "beatest" ? "many" : "one"}
								maxNumber={maxPickedSecondMeal}
								onClick={() => {
									onPickOption(setSecondMeal, "salad");
								}}
								leftNumber={maxPickedSecondMeal - addons.pickedSecondMealNumber}
								onIncrement={() => {
									dispatch(changeSecondMealNumber(1));
									dispatch(addSecondMeal("salad"));
								}}
								onDecrement={() => {
									dispatch(changeSecondMealNumber(-1));
									dispatch(removeSecondMeal("salad"));
								}}
							/>
						</div>
					</div>
					<div className={styles.pickOne}>
						<h1>Wybierz Napój</h1>
						<div className={styles.products}>
							<ProductPick
								leftNumber={maxPickedDrinkNumber - addons.pickedDrinkNumber}
								thumbnail={product.src}
								isChecked={addons.drink === "coca-cola"}
								name="Coca-Cola"
								maxNumber={maxPickedDrinkNumber}
								onClick={() => {
									onPickOption(setDrink, "coca-cola");
								}}
								type={addons.size === "beatest" ? "many" : "one"}
								onIncrement={() => {
									dispatch(changeDrinkNumber(1));
									dispatch(addDrink("coca-cola"));
								}}
								onDecrement={() => {
									dispatch(changeDrinkNumber(-1));
									dispatch(removeDrink("coca-cola"));
								}}
							/>
							<ProductPick
								leftNumber={maxPickedDrinkNumber - addons.pickedDrinkNumber}
								thumbnail={product.src}
								isChecked={addons.drink === "fanta"}
								name="Fanta"
								type={addons.size === "beatest" ? "many" : "one"}
								maxNumber={maxPickedDrinkNumber}
								onClick={() => {
									onPickOption(setDrink, "fanta");
								}}
								onIncrement={() => {
									dispatch(changeDrinkNumber(1));
									dispatch(addDrink("fanta"));
								}}
								onDecrement={() => {
									dispatch(changeDrinkNumber(-1));
									dispatch(removeDrink("fanta"));
								}}
							/>
						</div>
					</div>
				</>
			)}
			<div className={styles.burgerAddons}>
				<h1>Czy życzysz sobie dodatek do burgera?</h1>
				<div className={styles.products}>
					<ProductPick
						price={{ full: 3, point: 0 }}
						thumbnail={product.src}
						name="bekon"
						maxNumber={5}
						onIncrement={() => {
							dispatch(
								addAdditionalIngridient({
									name: "bekon",
									quantity: 1,
									thumbnail: "",
									price: { full: 3, point: 0 },
								})
							);
						}}
						onDecrement={() => {
							dispatch(removeAdditionalIngridient("bekon"));
						}}
					/>
					<ProductPick
						price={{ full: 5, point: 0 }}
						onIncrement={() => {
							dispatch(
								addAdditionalIngridient({
									name: "mieso",
									quantity: 1,
									thumbnail: "",
									price: { full: 5, point: 0 },
								})
							);
						}}
						onDecrement={() => {
							dispatch(removeAdditionalIngridient("mieso"));
						}}
						thumbnail={product.src}
						name="mieso"
						maxNumber={5}
					/>
				</div>
			</div>
			{addons.sumPrice.full > 0 && (
				<Price {...addons.sumPrice} style={{ margin: "32px 0 16px" }} />
			)}
			<Button
				style={{ margin: "16px 0 " }}
				Icon={AddIcon}
				iconProps={{ width: "13", height: "13" }}
				onClick={onAddToCart}
			>
				Dodaj
			</Button>
		</div>
	);
}

export default PickProducts;
