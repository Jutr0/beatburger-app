import React, { useState } from "react";

import product from "../../../assets/images/bekon.png";
import InputCheck from "../../InputCheck";

import styles from "./PickProducts.module.scss";
import ProductPick from "./ProductPick";

type IProps = {
	type: "burger" | "zestaw";
};

function PickProducts({ type }: IProps) {
	const [pickedSize, setPickedSize] = useState<"beat" | "beater" | "beatest">();
	const [pickedSecondMeal, setPickedSecondMeal] = useState<
		"salatka" | "frytki" | "bataty"
	>();
	const [pickedDrink, setPickedDrink] = useState<string>();

	return (
		<div className={styles.container}>
			{type === "zestaw" && (
				<>
					<div className={styles.mealSize}>
						<h1>Wybierz rozmiar zestawu</h1>
						<InputCheck
							value="BEAT"
							onClick={() => {
								setPickedSize("beat");
							}}
							isChecked={pickedSize === "beat"}
							style={{ fontWeight: 200 }}
						/>
						<InputCheck
							value="BEATER"
							onClick={() => {
								setPickedSize("beater");
							}}
							isChecked={pickedSize === "beater"}
							style={{ fontWeight: 500 }}
						/>
						<InputCheck
							value="BEATEST"
							onClick={() => {
								setPickedSize("beatest");
							}}
							isChecked={pickedSize === "beatest"}
							style={{ fontWeight: 700 }}
						/>
					</div>
					<div className={styles.pickOne}>
						<h1>Wybierz frytki lub sałatkę</h1>{" "}
						<div className={styles.products}>
							<ProductPick
								thumbnail={product.src}
								isChecked={pickedSecondMeal === "frytki"}
								name="Fytki"
								maxNumber={1}
								onClick={() => {
									setPickedSecondMeal("frytki");
								}}
								type="one"
							/>
							<ProductPick
								thumbnail={product.src}
								isChecked={pickedSecondMeal === "salatka"}
								name="Sałatka"
								type="one"
								maxNumber={1}
								onClick={() => {
									setPickedSecondMeal("salatka");
								}}
							/>
						</div>
					</div>
					<div className={styles.pickOne}>
						<h1>Wybierz Napój</h1>{" "}
						<div className={styles.products}>
							<ProductPick
								thumbnail={product.src}
								isChecked={pickedDrink === "coca-cola"}
								name="Coca-Cola"
								maxNumber={1}
								onClick={() => {
									setPickedDrink("coca-cola");
								}}
								type="one"
							/>
							<ProductPick
								thumbnail={product.src}
								isChecked={pickedDrink === "fanta"}
								name="Fanta"
								type="one"
								maxNumber={1}
								onClick={() => {
									setPickedDrink("fanta");
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
