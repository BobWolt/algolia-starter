'use client';
import React from 'react';
import { useContext } from 'react';
import Image from 'next/image';

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

	return (
		<main className='container mx-auto pt-24 p-4 container mx-auto flex min-h-screen flex-col items-center justify-between'>
			<div className='z-10 w-full flex flex-col items-center justify-between font-mono text-sm lg:flex'>
				<div className='w-full max-w-[800px] flex flex-col gap-16'>
					<h1 className='text-white text-6xl font-bold'>My cart</h1>
					<div className='flex flex-col gap-8'>
						{state.cart.map((p, i) => (
							<div
								key={p.title + i}
								className='pb-4 flex flex-row items-center justify-between border-b border-white/20'
							>
								<div className='flex flex-row gap-4'>
									<div className='relative w-28 h-24 flex flex-col justify-end border border-white/20 rounded-lg overflow-hidden'>
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
										{new Intl.NumberFormat('eng-US', {
											style: 'currency',
											currency: 'USD',
										}).format(Number(p.price) * p.amountInCart)}
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
				</div>
			</div>
		</main>
	);
}
