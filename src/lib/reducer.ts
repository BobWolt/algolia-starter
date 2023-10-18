import {
	StateInterface,
	ActionInterface,
	ProductInterface,
} from './globalTypes';

const updateCart = function (
	state: StateInterface,
	product: ProductInterface,
	action: string
) {
	const newCart = state.cart.map((item) =>
		item.id === product.id && item.colorSelected === product.colorSelected
			? {
					...item,
					amountInCart:
						action === 'increase'
							? item.amountInCart + 1
							: item.amountInCart - 1,
			  }
			: item
	);

	return { cart: newCart };
};

export const reducerFn = (state: StateInterface, action: ActionInterface) => {
	const { type, payload } = action;
	const product = payload as ProductInterface;

	switch (type) {
		case 'ADD_TO_CART':
			const existingProductInCart = state.cart.find(
				(item) =>
					item.id === product.id && item.colorSelected === product.colorSelected
			);

			if (existingProductInCart) {
				return updateCart(state, product, 'increase');
			} else {
				return {
					cart: [...state.cart, payload as ProductInterface],
				};
			}

		case 'INCREASE_IN_CART':
			return updateCart(state, product, 'increase');

		case 'DECREASE_IN_CART':
			return updateCart(state, product, 'decrease');

		case 'REMOVE_FROM_CART':
			const productIndex = state.cart.findIndex((item) => {
				return (
					item.id === product.id && item.colorSelected === product.colorSelected
				);
			});

			const newArr = [...state.cart];

			newArr.splice(productIndex, 1);

			return {
				cart: [...newArr],
			};

		case 'LOAD_FROM_STORAGE':
			return {
				cart: [...JSON.parse(localStorage.getItem('cart') || '{}')],
			};

		default:
			return state;
	}
};
