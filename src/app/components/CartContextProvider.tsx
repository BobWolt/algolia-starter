'use client';

import { useReducer, useEffect, PropsWithChildren } from 'react';
import { CartContext, initialState } from '../../lib/contexts';
import { reducerFn } from '../../lib/reducer';

export const CartContextProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(reducerFn, initialState);

	useEffect(() => {
		if (localStorage.getItem('cart')) {
			dispatch({
				type: 'LOAD_FROM_STORAGE',
				payload: [],
			});
		}
	}, []);

	useEffect(() => {
		if (state.cart.length) {
			localStorage.setItem('cart', JSON.stringify(state.cart));
		}
	}, [state]);

	return (
		<CartContext.Provider value={{ state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};
