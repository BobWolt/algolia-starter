'use client';
import Link from 'next/link';
import { useContext, useState, useEffect, use } from 'react';
import { CartContext } from '../../lib/contexts';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

export function NavBar() {
	const { state, dispatch } = useContext(CartContext);
	const [cartIcon, setCartIcon] = useState(false);

	useEffect(() => {
		console.log('lol');

		setCartIcon(!cartIcon);
	}, [state.cart]);

	const variants = {
		show: {
			opacity: 1,
			y: [0, 15, 0],
			transition: {
				ease: 'easeOut',
				duration: 0.25,
			},
		},
		reshow: {
			opacity: 1,
			y: [0, 15, 0],
			transition: {
				ease: 'easeOut',
				duration: 0.25,
			},
		},
		initial: {
			y: 0,
		},
	};

	return (
		<nav className='fixed pl-2 pr-8 py-2 z-50 w-full flex flex-row items-center justify-between bg-transparent'>
			<Link href={'/'}>
				<div className='bg-black px-4 py-2 cursor-pointer'>
					<svg
						id='logo-70'
						className='w-12'
						width='78'
						height='30'
						viewBox='0 0 78 30'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						{' '}
						<path
							d='M18.5147 0C15.4686 0 12.5473 1.21005 10.3934 3.36396L3.36396 10.3934C1.21005 12.5473 0 15.4686 0 18.5147C0 24.8579 5.14214 30 11.4853 30C14.5314 30 17.4527 28.7899 19.6066 26.636L24.4689 21.7737C24.469 21.7738 24.4689 21.7736 24.4689 21.7737L38.636 7.6066C39.6647 6.57791 41.0599 6 42.5147 6C44.9503 6 47.0152 7.58741 47.7311 9.78407L52.2022 5.31296C50.1625 2.11834 46.586 0 42.5147 0C39.4686 0 36.5473 1.21005 34.3934 3.36396L15.364 22.3934C14.3353 23.4221 12.9401 24 11.4853 24C8.45584 24 6 21.5442 6 18.5147C6 17.0599 6.57791 15.6647 7.6066 14.636L14.636 7.6066C15.6647 6.57791 17.0599 6 18.5147 6C20.9504 6 23.0152 7.58748 23.7311 9.78421L28.2023 5.31307C26.1626 2.1184 22.5861 0 18.5147 0Z'
							fill='white'
						></path>{' '}
						<path
							d='M39.364 22.3934C38.3353 23.4221 36.9401 24 35.4853 24C33.05 24 30.9853 22.413 30.2692 20.2167L25.7982 24.6877C27.838 27.8819 31.4143 30 35.4853 30C38.5314 30 41.4527 28.7899 43.6066 26.636L62.636 7.6066C63.6647 6.57791 65.0599 6 66.5147 6C69.5442 6 72 8.45584 72 11.4853C72 12.9401 71.4221 14.3353 70.3934 15.364L63.364 22.3934C62.3353 23.4221 60.9401 24 59.4853 24C57.0498 24 54.985 22.4127 54.269 20.2162L49.798 24.6873C51.8377 27.8818 55.4141 30 59.4853 30C62.5314 30 65.4527 28.7899 67.6066 26.636L74.636 19.6066C76.7899 17.4527 78 14.5314 78 11.4853C78 5.14214 72.8579 0 66.5147 0C63.4686 0 60.5473 1.21005 58.3934 3.36396L39.364 22.3934Z'
							fill='white'
						></path>{' '}
					</svg>
				</div>
			</Link>
			<Link href={'/cart'}>
				<div className='relative flex flex-row items-center'>
					<ShoppingCart color='white' />
					<motion.div
						key={'cartIcon'}
						variants={variants}
						initial='initial'
						animate={cartIcon ? 'show' : 'reshow'}
						className='absolute text-xs -right-2 -top-2 w-4 h-4 rounded-full flex flex-row items-center justify-center text-white bg-blue-600'
					>
						{state.cart.length}
					</motion.div>
				</div>
			</Link>
		</nav>
	);
}
