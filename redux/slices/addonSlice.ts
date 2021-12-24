import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	IAddon,
	IDrink,
	IErrors,
	IMealSize,
	IMealType,
	ISecondMeal,
} from "../../assets/types/addons";
import { IPrice, IProduct } from "../../assets/types/orders";

const initialState: IAddon = {
	type: "other",
	additionalIngredients: [],
	sumPrice: {
		full: 0,
		point: 0,
	},
	pickedSecondMealNumber: 0,
	pickedDrinkNumber: 0,
	errors: {
		size: false,
		secondMeal: false,
		drink: false,
	},
};

const addonSlice = createSlice({
	name: "addonSlice",
	initialState,
	reducers: {
		setType(state, action: PayloadAction<IMealType>) {
			return { ...initialState, type: action.payload };
		},
		setSize(state, action: PayloadAction<IMealSize>) {
			return {
				...state,
				pickedSecondMealNumber: 0,
				pickedDrinkNumber: 0,
				size: action.payload,
				secondMeal: undefined,
				drink: undefined,
			};
		},
		setSumPrice(state, action: PayloadAction<IPrice>) {
			return { ...state, sumPrice: action.payload };
		},
		setSecondMeal(state, action: PayloadAction<ISecondMeal>) {
			state.secondMeal = action.payload;
		},
		addSecondMeal(state, action: PayloadAction<ISecondMeal>) {
			if (Array.isArray(state.secondMeal)) {
				state.secondMeal.push(action.payload);
			} else {
				state.secondMeal = [action.payload];
			}
		},
		removeSecondMeal(state, action: PayloadAction<ISecondMeal>) {
			if (Array.isArray(state.secondMeal)) {
				const index = state.secondMeal.indexOf(action.payload);
				state.secondMeal.splice(index, 1);
			}
		},
		changeSecondMealNumber(state, action: PayloadAction<number>) {
			state.pickedSecondMealNumber += action.payload;
		},
		changeDrinkNumber(state, action: PayloadAction<number>) {
			state.pickedDrinkNumber += action.payload;
		},
		setDrink(state, action: PayloadAction<IDrink>) {
			state.drink = action.payload;
		},
		addDrink(state, action: PayloadAction<IDrink>) {
			if (Array.isArray(state.drink)) {
				state.drink.push(action.payload);
			} else {
				state.drink = [action.payload];
			}
		},
		removeDrink(state, action: PayloadAction<IDrink>) {
			if (Array.isArray(state.drink)) {
				const index = state.drink.indexOf(action.payload);
				state.drink.splice(index, 1);
			}
		},
		addAdditionalIngridient(
			state,
			action: PayloadAction<IProduct & { price: IPrice }>
		) {
			let index: number = -1;

			state.additionalIngredients.forEach((step, id) => {
				action.payload.name === step.name ? (index = id) : null;
			});
			if (state.additionalIngredients && index > -1) {
				state.additionalIngredients[index].quantity!++;
			} else {
				state.additionalIngredients.push({ ...action.payload, quantity: 1 });
			}
		},
		removeAdditionalIngridient(state, action: PayloadAction<string>) {
			let index: number = -1;

			state.additionalIngredients.forEach((step, id) => {
				action.payload === step.name ? (index = id) : null;
			});
			if (index < 0) return;
			if (state.additionalIngredients[index].quantity < 1) return;
			state.additionalIngredients[index].quantity--;
		},
		setError(state, action: PayloadAction<IErrors>) {
			state.errors = action.payload;
		},
	},
});

export const {
	setType,
	setDrink,
	setSecondMeal,
	setSize,
	removeAdditionalIngridient,
	removeSecondMeal,
	addAdditionalIngridient,
	addSecondMeal,
	changeSecondMealNumber,
	changeDrinkNumber,
	setSumPrice,
	addDrink,
	removeDrink,
	setError,
} = addonSlice.actions;
export default addonSlice.reducer;
