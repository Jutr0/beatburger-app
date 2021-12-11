import React, { useState } from "react";

import product from "../../../assets/images/bekon.png";
import { IMealSize, ISecondMeal } from "../../../assets/types/addons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	changeDrinkNumber,
	changeSecondMealNumber,
	setDrink,
	setSecondMeal,
	setSize,
} from "../../../redux/slices/addonSlice";
import InputCheck from "../../InputCheck";

import styles from "./PickProducts.module.scss";
import ProductPick from "./ProductPick";

function PickProducts() {
	const dispatch = useAppDispatch();
	const addons = useAppSelector((state) => state.addons);

	const maxPickedSecondMeal = 2;
	const maxPickedDrinkNumber = 2;

	const onPickSecondMeal = (name: ISecondMeal) => {
		if (addons.size !== "beatest") {
			dispatch(setSecondMeal(name));
		}
		console.log(addons);
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
									onPickSecondMeal("fries");
								}}
								onIncrement={() => {
									dispatch(changeSecondMealNumber(1));
								}}
								onDecrement={() => {
									dispatch(changeSecondMealNumber(-1));
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
									onPickSecondMeal("salad");
								}}
								leftNumber={maxPickedSecondMeal - addons.pickedSecondMealNumber}
								onIncrement={() => {
									dispatch(changeSecondMealNumber(1));
								}}
								onDecrement={() => {
									dispatch(changeSecondMealNumber(-1));
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
									dispatch(setDrink("coca-cola"));
								}}
								type={addons.size === "beatest" ? "many" : "one"}
								onIncrement={() => {
									dispatch(changeDrinkNumber(1));
								}}
								onDecrement={() => {
									dispatch(changeDrinkNumber(-1));
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
									dispatch(setDrink("fanta"));
								}}
								onIncrement={() => {
									dispatch(changeDrinkNumber(1));
								}}
								onDecrement={() => {
									dispatch(changeDrinkNumber(-1));
								}}
							/>
						</div>
					</div>
				</>
			)}
			<div className={styles.burgerAddons}>
				<h1>Czy życzysz sobie dodatek do burgera?</h1>
				<div className={styles.products}>
					<ProductPick thumbnail={product.src} name="bekon" maxNumber={5} />
					<ProductPick thumbnail={product.src} name="bekon" maxNumber={5} />
				</div>
			</div>
		</div>
	);
}

export default PickProducts;
