import { configureStore } from "@reduxjs/toolkit";
import addonSlice from "./slices/addonSlice";
import cartReducer from "./slices/cartSlice";
import ingredientsSlice from "./slices/ingredientsSlice";
import drinksSlice from "./slices/drinksSlice";

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		addons: addonSlice,
		ingredients: ingredientsSlice,
		drinks: drinksSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
