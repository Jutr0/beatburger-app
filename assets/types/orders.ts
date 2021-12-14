import { IMealType, ISecondMeal } from "./addons";

export type IOrder = ICart & {
	client: IClient;
	paymentMethod: IPaymentMethod;
	deliveryMethod: IDeliveryMethod;
};

export type ICart = {
	sumPrice: IPrice;
	orders: IMinOffert[];
};

export type IPaymentMethod = "online" | "card" | "cash";
export type IDeliveryMethod = "delivery" | "inRestaurant" | "pickup";

export type IPrice = {
	full: number;
	point: number;
};

export type IMinOffert = {
	id: string;
	name: string;
	price: IPrice;
	additionalProducts?: (IProduct & { price: IPrice })[];
	quantity?: number;
	type: IMealType;
	secondMeal?: ISecondMeal | ISecondMeal[];
	drink?: string | string[];
};

export type IOffert = IMinOffert & {
	thumbnail: string;
	products: IProduct[];
};

export type IProduct = {
	name: string;
	thumbnail: string;
	quantity: number;
};

export type IClient = {
	name: string;
	address: {
		street: string;
		city: string;
		number: string;
		local?: string;
	};
	phone: number;
	isLogged: boolean;
	email?: string;
	orderNumber?: number;
};
