import { configureStore } from "@reduxjs/toolkit";
import addonSlice from "./slices/addonSlice";
import cartReducer from "./slices/cartSlice";
import ingredientsSlice from "./slices/ingredientsSlice";

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		addons: addonSlice,
		ingredients: ingredientsSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
