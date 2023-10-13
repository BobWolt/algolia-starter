'use client';
import React from 'react';
import { useContext } from 'react';
import Image from 'next/image';

import { ArrowRight, X } from 'lucide-react';

import { CartContext } from '../../lib/contexts';
export default function Cart() {
	const { state, dispatch } = useContext(CartContext);

	const handleClick = function (e: React.MouseEvent<HTMLButtonElement>) {
		const target = e.target as HTMLButtonElement;
		const type = target.value;

		dispatch({
			type: type === 'increment' ? 'INCREASE_IN_CART' : 'DECREASE_IN_CART',
			payload: {
				title: '',
				description: '',
				price: '',
				image_url: '',
				id: target.getAttribute('data-product-id'),
				properties: '',
				amountInCart: 1,
				colorSelected: target.getAttribute('data-color-selected'),
			},
		});
	};

	const handleRemoveFromCart = function (
		e: React.MouseEvent<HTMLButtonElement>
	) {
		const target = e.currentTarget as HTMLButtonElement;

		dispatch({
			type: 'REMOVE_FROM_CART',
			payload: {
				title: '',
				description: '',
				price: '',
				image_url: '',
				id: target.getAttribute('data-product-id'),
				properties: '',
				amountInCart: 0,
				colorSelected: target.getAttribute('data-color-selected'),
			},
		});
	};

	const formatPrice = function (price: number) {
		const formattedPrice = new Intl.NumberFormat('eng-US', {
			style: 'currency',
			currency: 'USD',
		}).format(price);

		return formattedPrice;
	};

	const totalPriceInCart = state.cart
		.map((item) => Number(item.price) * item.amountInCart)
		.reduce((a, c) => a + c, 0);

	return (
		<main className='container mx-auto pt-24 p-4 container mx-auto flex min-h-screen flex-col items-center justify-between'>
			<div className='z-10 w-full flex flex-col items-center justify-between font-mono text-sm lg:flex'>
				<div className='w-full max-w-[800px] flex flex-col gap-8'>
					<h1 className='text-white text-2xl'>My cart</h1>

					<div className='pr-4 flex flex-col gap-8 h-96 overflow-y-scroll'>
						{state.cart.map((p, i) => (
							<div
								key={p.title + i}
								className='pb-4 flex flex-row items-center justify-between border-b border-white/20'
							>
								<div className='pt-4 relative flex flex-row gap-4'>
									<div className='relative w-28 h-24 flex flex-col justify-end border border-white/20 rounded-lg'>
										<button
											data-product-id={p.id}
											data-color-selected={p.colorSelected}
											onClick={handleRemoveFromCart}
											className='p-[1px] z-50 absolute -top-2 -right-2 bg-slate-300 rounded-full'
										>
											<X className='w-4 h-4' color='black' />
										</button>
										<Image
											className='z-10 p-1 rounded-lg overflow-hidden'
											fill
											objectFit='cover'
											src={p.image_url}
											alt={'Image of a ' + p.title}
										/>
									</div>
									<div className='flex flex-col'>
										<span className='text-white text-xl'>{p.title}</span>
										<span className='text-white/40 text-sm'>
											{p.colorSelected}
										</span>
									</div>
								</div>
								<div className='flex flex-col justify-start items-end gap-4'>
									<span className='text-white text-xl'>
										{formatPrice(Number(p.price) * p.amountInCart)}
									</span>
									<div className='px-4 py-2 text-sm grid grid-cols-3 place-items-center gap-4 w-full border border-white/20 rounded-full'>
										<button
											onClick={handleClick}
											value={'decrement'}
											data-product-id={p.id}
											data-color-selected={p.colorSelected}
											disabled={p.amountInCart === 1 && true}
											className={`text-white/40 font-bold ${
												p.amountInCart === 1 && 'cursor-not-allowed'
											}`}
										>
											-
										</button>
										<span className='text-white'>{p.amountInCart}</span>
										<button
											onClick={handleClick}
											value={'increment'}
											data-product-id={p.id}
											data-color-selected={p.colorSelected}
											className='text-white/40 font-bold'
										>
											+
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className='w-full flex flex-col items-end gap-4'>
						<div className='pb-4 w-full flex flex-row items-center justify-between border-b border-white/20'>
							<span>Shipping</span>
							<span className='text-white/40'>Calculated at checkout</span>
						</div>
						<div className='pb-4 w-full flex flex-row items-center justify-between border-b border-white/20'>
							<span>Total</span>
							<span className='text-xl'>{formatPrice(totalPriceInCart)}</span>
						</div>

						<div className='flex flex-col gap-2 items-center'>
							<button
								disabled
								className='px-8 py-4 rounded-full flex flex-col items-center gap-2 bg-blue-800 cursor-not-allowed text-white'
							>
								{'Proceed to checkout'}
							</button>
							<span className='text-xs text-red-500/30'>
								{'(not integrated)'}
							</span>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
