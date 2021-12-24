import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, IMinOffert, IPrice } from "../../assets/types/orders";

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
			const price = action.payload.price as IPrice;
			state.sumPrice.full += price.full;
			state.sumPrice.point += price.point;
			if (state.sumPrice.point >= 100) {
				state.sumPrice.full++;
				state.sumPrice.point %= 100;
			}
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			const temp = state.orders.filter((order) => order.id !== action.payload);
			state.orders = temp;
		},
		increaseQuantity: (state, action: PayloadAction<string>) => {
			state.orders.forEach((step) => {
				if (step.id === action.payload) {
					step.quantity!++;
					const price = step.price as IPrice;
					state.sumPrice.full += price.full;
					state.sumPrice.point += price.point;
					if (state.sumPrice.point >= 100) {
						state.sumPrice.full++;
						state.sumPrice.point %= 100;
					}
				}
			});
		},
		decreaseQuantity: (state, action: PayloadAction<string>) => {
			state.orders.forEach((step) => {
				if (step.id !== action.payload) return;
				if (step.quantity! <= 1) {
					const temp = state.orders.filter(
						(order) => order.id !== action.payload
					);
					state.orders = temp;
				} else step.quantity!--;
				const price = step.price as IPrice;
				state.sumPrice.full -= price.full;
				state.sumPrice.point -= price.point;
				if (state.sumPrice.point < 0) {
					state.sumPrice.full--;
					state.sumPrice.point += 100;
				}
			});
		},
	},
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
	cartSlice.actions;
export default cartSlice.reducer;
