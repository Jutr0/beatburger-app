import React, { useEffect, useState } from "react";

import product from "../../../assets/images/bekon.png";
import { IErrors, IMealMainType } from "../../../assets/types/addons";
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
	setError,
	setSecondMeal,
	setSize,
	setSumPrice,
} from "../../../redux/slices/addonSlice";
import Button from "../../Button";
import InputCheck from "../../InputCheck";
import ProductPick from "./ProductPick";
import AddIcon from "../Offert/plus-svgrepo-com.svg";
import { addToCart } from "../../../redux/slices/cartSlice";
import Price from "../../Price";

import styles from "./PickProducts.module.scss";

type IProps = {
	name: string;
	price: IPrice[] | IPrice;
	onClose: Function;
	mainType: IMealMainType;
};

function PickProducts({ name, price, onClose, mainType }: IProps) {
	const dispatch = useAppDispatch();
	const addons = useAppSelector((state) => state.addons);
	const ingredients = useAppSelector((state) => state.ingredients);
	const drinks = useAppSelector((state) => state.drinks);

	const maxPickedSecondMeal = 2;
	const maxPickedDrinkNumber = 2;

	const onPickOption = (callback: Function, obj: any) => {
		if (addons.size !== "beatest") {
			dispatch(callback(obj));
		}
	};

	const checkErrors = () => {
		let whereToScroll = "";

		const errors: IErrors = {
			size: false,
			secondMeal: false,
			drink: false,
		};
		if (!addons.size) {
			errors.size = true;
			whereToScroll = "size";
		}
		if (
			!addons.secondMeal ||
			(addons.size === "beatest" && addons.pickedSecondMealNumber < 2)
		) {
			errors.secondMeal = true;
			whereToScroll = whereToScroll || "secondMeal";
		}
		if (
			!addons.drink ||
			(addons.size === "beatest" && addons.pickedDrinkNumber < 2)
		) {
			errors.drink = true;
			whereToScroll = whereToScroll || "drink";
		}
		document.getElementById(whereToScroll)!.scrollIntoView(true);
		dispatch(setError(errors));
	};

	const onAddToCart = () => {
		if (
			addons.type === "zestaw" &&
			(!addons.drink ||
				!addons.secondMeal ||
				!addons.size ||
				(addons.size === "beatest" &&
					(addons.pickedDrinkNumber < 2 || addons.pickedSecondMealNumber < 2)))
		) {
			checkErrors();

			return;
		}

		const temp: IMinOffert = {
			name,
			mainType,
			price: addons.sumPrice,
			additionalProducts: addons.additionalIngredients.filter(
				(step) => step.quantity > 0
			),
			size: addons.size,
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
	}, [addons.size, addons.additionalIngredients, addons.secondMeal]);

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

		addons.additionalIngredients.forEach((step) => {
			full += step.price.full * step.quantity;
			point += step.price.point * step.quantity;
		});
		if (Array.isArray(addons.secondMeal)) {
			addons.secondMeal.forEach((step) => {
				if (step.name === "sweet potatoes") full += 2;
			});
		} else if (
			addons.secondMeal &&
			addons.secondMeal.name === "sweet potatoes"
		) {
			full += addons.size === "beater" ? 3 : 2;
		}
		full += Math.floor(point / 100);
		point = point % 100;

		dispatch(setSumPrice({ full, point }));
	};
	return (
		<div className={styles.container}>
			{addons.type === "zestaw" && (
				<>
					<div className={styles.mealSize}>
						<h1 id="size" className={`${addons.errors.size && styles.error}`}>
							Wybierz rozmiar zestawu
						</h1>
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
						<h1
							id="secondMeal"
							className={`${addons.errors.secondMeal && styles.error}`}
						>
							{(addons.size === "beat" || !addons.size) &&
								"Frytki lub Sałatka "}
							{addons.size === "beater" && "Frytki XL lub Sałatka XL"}
							{addons.size === "beatest" && "Frytki lub Sałatka (Wybierz dwa)"}
						</h1>
						<div className={styles.products}>
							<ProductPick
								thumbnail={product.src}
								isChecked={
									!Array.isArray(addons.secondMeal) &&
									addons.secondMeal?.name === "fries"
								}
								name="Fytki"
								maxNumber={maxPickedSecondMeal}
								leftNumber={maxPickedSecondMeal - addons.pickedSecondMealNumber}
								onClick={() => {
									onPickOption(setSecondMeal, {
										name: "fries",
										title: "Frytki",
									});
								}}
								onIncrement={() => {
									dispatch(changeSecondMealNumber(1));
									dispatch(addSecondMeal({ name: "fries", title: "Frytki" }));
								}}
								onDecrement={() => {
									dispatch(changeSecondMealNumber(-1));
									dispatch(
										removeSecondMeal({ name: "fries", title: "Frytki" })
									);
								}}
								type={addons.size === "beatest" ? "many" : "one"}
							/>
							<ProductPick
								thumbnail={product.src}
								isChecked={
									!Array.isArray(addons.secondMeal) &&
									addons.secondMeal?.name === "salad"
								}
								name="Sałatka"
								type={addons.size === "beatest" ? "many" : "one"}
								maxNumber={maxPickedSecondMeal}
								onClick={() => {
									onPickOption(setSecondMeal, {
										name: "salad",
										title: "Sałatka",
									});
								}}
								leftNumber={maxPickedSecondMeal - addons.pickedSecondMealNumber}
								onIncrement={() => {
									dispatch(changeSecondMealNumber(1));
									dispatch(addSecondMeal({ name: "salad", title: "Sałatka" }));
								}}
								onDecrement={() => {
									dispatch(changeSecondMealNumber(-1));
									dispatch(
										removeSecondMeal({ name: "salad", title: "Sałatka" })
									);
								}}
							/>
							<ProductPick
								isSurcharge
								price={{ full: addons.size === "beater" ? 3 : 2, point: 0 }}
								thumbnail={product.src}
								isChecked={
									!Array.isArray(addons.secondMeal) &&
									addons.secondMeal?.name === "sweet potatoes"
								}
								name="Frytki z Batatów"
								type={addons.size === "beatest" ? "many" : "one"}
								maxNumber={maxPickedSecondMeal}
								onClick={() => {
									onPickOption(setSecondMeal, {
										name: "sweet potatoes",
										title: "Frytki z Batatów",
									});
								}}
								leftNumber={maxPickedSecondMeal - addons.pickedSecondMealNumber}
								onIncrement={() => {
									dispatch(changeSecondMealNumber(1));
									dispatch(
										addSecondMeal({
											name: "sweet potatoes",
											title: "Frytki z Batatów",
										})
									);
								}}
								onDecrement={() => {
									dispatch(changeSecondMealNumber(-1));
									dispatch(
										removeSecondMeal({
											name: "sweet potatoes",
											title: "Frytki z Batatów",
										})
									);
								}}
							/>
						</div>
					</div>
					<div className={styles.pickOne}>
						<h1 id="drink" className={`${addons.errors.drink && styles.error}`}>
							{(addons.size === "beat" || !addons.size) && "Wybierz Napój"}
							{addons.size === "beater" && "Wybierz Napój XL"}
							{addons.size === "beatest" && "Wybierz dwa napoje"}
						</h1>
						<div className={styles.products}>
							{drinks.map((drink) => {
								if (addons.size === "beater" && drink.size !== "beater") return;
								if (addons.size !== "beater" && drink.size === "beater") return;
								return (
									<ProductPick
										key={drink.id}
										leftNumber={maxPickedDrinkNumber - addons.pickedDrinkNumber}
										thumbnail={drink.thumbnail}
										isChecked={
											!Array.isArray(addons.drink) &&
											addons.drink?.name === drink.id
										}
										name={drink.name}
										maxNumber={maxPickedDrinkNumber}
										onClick={() => {
											onPickOption(setDrink, {
												name: drink.id,
												title: drink.name,
											});
										}}
										type={addons.size === "beatest" ? "many" : "one"}
										onIncrement={() => {
											dispatch(changeDrinkNumber(1));
											dispatch(addDrink({ name: drink.id, title: drink.name }));
										}}
										onDecrement={() => {
											dispatch(changeDrinkNumber(-1));
											dispatch(
												removeDrink({ name: drink.id, title: drink.name })
											);
										}}
									/>
								);
							})}
						</div>
					</div>
				</>
			)}
			{mainType === "burger" && (
				<div className={styles.burgerAddons}>
					<h1>Czy życzysz sobie dodatek do burgera?</h1>
					<div className={styles.products}>
						{ingredients.map((step) => {
							return (
								step.price && (
									<ProductPick
										key={step.id}
										price={step.price}
										thumbnail={step.thumbnail}
										name={step.name}
										maxNumber={5}
										onIncrement={() => {
											dispatch(
												addAdditionalIngridient({
													name: step.name,
													quantity: 1,
													thumbnail: "",
													price: step.price!,
												})
											);
										}}
										onDecrement={() => {
											dispatch(removeAdditionalIngridient(step.name));
										}}
									/>
								)
							);
						})}
					</div>
				</div>
			)}
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
