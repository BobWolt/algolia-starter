import { createContext } from 'react';
import { StateInterface } from './globalTypes';

export const initialState: StateInterface = {
	cart: [],
};

export const CartContext = createContext<{
	state: StateInterface;
	dispatch: React.Dispatch<any>;
}>({
	state: initialState,
	dispatch: () => null,
});
