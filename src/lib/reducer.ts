import {
	StateInterface,
	ActionInterface,
	ProductInterface,
} from './globalTypes';

export const reducerFn = (state: StateInterface, action: ActionInterface) => {
	const { type, payload } = action;
	const product = payload as ProductInterface;

	switch (type) {
		case 'ADD_TO_CART':
			if (
				state.cart.find(
					(item) =>
						item.id === product.id &&
						item.colorSelected === product.colorSelected
				)
			) {
				return {
					cart: state.cart.map((item) =>
						item.id === product.id &&
						item.colorSelected === product.colorSelected
							? { ...item, amountInCart: item.amountInCart + 1 }
							: item
					),
				};
			} else {
				return {
					cart: [...state.cart, payload as ProductInterface],
				};
			}
		case 'INCREASE_IN_CART':
			return {
				cart: state.cart.map((item) =>
					item.id === product.id && item.colorSelected === product.colorSelected
						? { ...item, amountInCart: item.amountInCart + 1 }
						: item
				),
			};
		case 'DECREASE_IN_CART':
			return {
				cart: state.cart.map((item) =>
					item.id === product.id && item.colorSelected === product.colorSelected
						? { ...item, amountInCart: item.amountInCart - 1 }
						: item
				),
			};
		case 'LOAD_FROM_STORAGE':
			return {
				cart: [...JSON.parse(localStorage.getItem('cart') || '{}')],
			};
		default:
			return state;
	}
};
