'use client';

import { useReducer, useEffect, useMemo, PropsWithChildren } from 'react';
import { CartContext, initialState } from '../../lib/contexts';
import { reducerFn } from '../../lib/reducer';

export const CartContextProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(reducerFn, initialState);

	// Working with state objects might trigger unnecessary re-renders
	// For this we useMemo to cache previous cart states on the context value
	const contextValue = useMemo(() => {
		return { state, dispatch };
	}, [state, dispatch]);

	// Check local storage for cart data on initial mount
	useEffect(() => {
		if (localStorage.getItem('cart')) {
			dispatch({
				type: 'LOAD_FROM_STORAGE',
				payload: [],
			});
		}
	}, []);

	// Update the local storage cart data on every change to the cart
	useEffect(() => {
		if (state.cart.length) {
			localStorage.setItem('cart', JSON.stringify(state.cart));
		}
	}, [state.cart]);

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	);
};
