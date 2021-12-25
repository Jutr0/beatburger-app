import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApiOffert } from "../../assets/firebase/firestore";

const initialState: IApiOffert[] = [];

const drinksSlice = createSlice({
	name: "drinksSlice",
	initialState,
	reducers: {
		setDrinksSection(state, action: PayloadAction<IApiOffert[]>) {
			return action.payload;
		},
	},
});

export const { setDrinksSection } = drinksSlice.actions;
export default drinksSlice.reducer;
