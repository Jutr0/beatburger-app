import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../../assets/firebase/firestore";

const initialState: IIngredient[] = [];

const ingredientsSlice = createSlice({
	name: "ingredientsSlice",
	initialState,
	reducers: {
		setIngredients(state, action: PayloadAction<IIngredient[]>) {
			return action.payload;
		},
	},
});

export const { setIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
