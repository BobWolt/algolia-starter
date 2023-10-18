export interface ProductInterface {
	title: string;
	description: string;
	price: string;
	image_url: string;
	id: string;
	properties: Array<{ name: string; value: any }>;
	amountInCart: number;
	colorSelected: string;
}

export interface ActionInterface {
	type: string;
	payload: unknown;
}

export interface StateInterface {
	cart: ProductInterface[];
}
