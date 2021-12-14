import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, IMinOffert } from "../../assets/types/orders";

const initialState: ICart = {
	orders: [],
	sumPrice: {
		full: 0,
		point: 0,
	},
};

const cartSlice = createSlice({
	name: "cartSlice",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<IMinOffert>) => {
			let index: number = -1;

			state.orders.forEach((step, id) => {
				action.payload.id === step.id ? (index = id) : null;
			});
			if (state.orders && index > -1) {
				state.orders[index].quantity!++;
			} else {
				state.orders.push({ ...action.payload, quantity: 1 });
			}
			state.sumPrice.full += action.payload.price.full;
			state.sumPrice.point += action.payload.price.point;
			if (state.sumPrice.point >= 100) {
				state.sumPrice.full++;
				state.sumPrice.point %= 100;
			}
		},
		removeFromCart: (state) => {
			state.sumPrice.full--;
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
