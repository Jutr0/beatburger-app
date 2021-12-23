import { IPrice, IProduct } from "./orders";

export type IAddon = {
	type: IMealType;
	size?: IMealSize;
	secondMeal?: ISecondMeal | ISecondMeal[];
	drink?: { title: string; name: string } | { title: string; name: string }[];
	additionalIngredients: (IProduct & { price: IPrice })[];
	sumPrice: IPrice;
	pickedSecondMealNumber: number;
	pickedDrinkNumber: number;
};

export type IMealSize = "beat" | "beater" | "beatest";

export type IMealType = "zestaw" | "other";

export type ISecondMeal = {
	title: string;
	name: string;
};
export type IDrink = {
	title: string;
	name: string;
};

export type IMealMainType = "burger" | "chicken" | "other";
