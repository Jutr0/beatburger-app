export type IOrder = {
	client: IClient;
};

export type IOffert = {};

export type IProduct = {
	name: string;
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
