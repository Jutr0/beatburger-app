import { IPrice, IProduct } from "./orders";

export type IAddon = {
	type: IMealType;
	size: IMealSize;
	secondMeal?: ISecondMeal | ISecondMeal[];
	drink?: string;
	additionalIngridients: (IProduct & IPrice)[];
	sumPrice: IPrice;
	pickedSecondMealNumber: number;
	pickedDrinkNumber: number;
};

export type IMealSize = "beat" | "beater" | "beatest";

export type IMealType = "zestaw" | "burger" | "other";

export type ISecondMeal = "fries" | "salad" | "sweetFries";
