import { IPrice, IProduct } from "./orders";

export type IAddon = {
	type: IMealType;
	size?: IMealSize;
	secondMeal?: ISecondMeal | ISecondMeal[];
	drink?: string | string[];
	additionalIngredients: (IProduct & { price: IPrice })[];
	sumPrice: IPrice;
	pickedSecondMealNumber: number;
	pickedDrinkNumber: number;
};

export type IMealSize = "beat" | "beater" | "beatest";

export type IMealType = "zestaw" | "other";

export type ISecondMeal = "fries" | "salad" | "sweetFries";

export type IMealMainType = "burger" | "chicken" | "other";
