import { useContext, useState } from 'react';
import { CartContext } from '../../lib/contexts';

import Image from 'next/image';
import Link from 'next/link';

import { Plus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

type Hit = {
	title: string;
	description: string;
	price: string;
	image_url: string;
	id: string;
	properties: Array<{ name: string; value: any }>;
};

export function HitFullPage(props: { hit: Hit }) {
	const { state, dispatch } = useContext(CartContext);

	const [productAdded, setProductAdded] = useState(false);
	const handleClick = () => {
		dispatch({
			type: 'ADD_TO_CART',
			payload: {
				title: props.hit.title,
				description: props.hit.description,
				price: props.hit.price,
				image_url: props.hit.image_url,
				id: props.hit.id,
				properties: props.hit.properties,
				amountInCart: 1,
				colorSelected: colorSelected,
			},
		});

		setProductAdded(true);
	};

	const [colorSelected, setColorSelected] = useState('Black');
	const handleColor = function (e: React.MouseEvent<HTMLButtonElement>) {
		const target = e.target as HTMLButtonElement;
		setColorSelected(target.value);

		// Set to false in order to show Add to cart button again
		setProductAdded(false);
	};
	``;
	return (
		<motion.div
			initial={{ opacity: 0, y: -50 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: {
					duration: 0.2,
					type: 'spring',
					stiffness: 200,
					damping: 15,
				},
			}}
			className='text-white w-screen md:h-screen md:max-h-[100vh] h-full grid md:grid-cols-2 grid-cols-1 overflow-hidden'
		>
			<div className='relative w-full md:h-full h-96 flex flex-col justify-end'>
				<Image
					className='z-10'
					fill
					priority
					style={{ objectFit: 'cover' }}
					src={props.hit.image_url}
					alt={'Image of a ' + props.hit.title}
				/>
			</div>
			<div className='relative md:p-24 p-4 z-50 flex flex-col gap-12 md:max-h-[100vh] h-full overflow-y-scroll'>
				<div className='pb-8 flex flex-col gap-8 items-start border-b border-white/20'>
					<h1 className='text-6xl font-bold'>{props.hit.title}</h1>
					<p>{props.hit.description}</p>
					<span className='px-6 py-2 bg-blue-600 rounded-full w-content'>
						${props.hit.price} USD
					</span>
				</div>

				<div className='flex flex-col gap-4'>
					{props.hit.properties.map((p, i) => (
						<div key={p.name + i} className='flex flex-col items-start gap-2'>
							<h3 className='text-md uppercase'>{p.name}</h3>

							{typeof p.value !== 'string' ? (
								<div className='flex flex-row items-center flex-wrap gap-4'>
									{p.value.map((color: string, i: number) => (
										<button
											key={color + i}
											onClick={handleColor}
											value={color}
											className={`px-4 py-1 text-sm bg-[#333] border border-white/20 rounded-full ${
												colorSelected === color &&
												'bg-pink-600 border-2 border-blue-600'
											}`}
										>
											{color}
										</button>
									))}
								</div>
							) : (
								<span className='text-white/40'>{p.value}</span>
							)}
						</div>
					))}
				</div>

				{!productAdded ? (
					<motion.button
						whileHover={{ scale: 1.02 }}
						onClick={handleClick}
						className='w-full px-8 py-4 flex flex-row items-center justify-center gap-2 text-lg bg-blue-600 rounded-full hover:bg-blue-700'
					>
						<Plus color='white' />
						Add to cart
					</motion.button>
				) : (
					<div className='w-full flex flex-col justify-center items-center gap-4 text-blue-600'>
						<Link href={'/cart'}>
							<motion.button
								whileHover={{ scale: 1.05 }}
								className='px-8 py-4 rounded-full flex flex-row items-center gap-2 bg-blue-600 text-white'
							>
								<ShoppingCart className='w-4 h-4' />
								View cart
							</motion.button>
						</Link>
						<div className='flex flex-col items-center gap-2'>
							<span className='text-white'>or</span>
							<button
								onClick={() => {
									setProductAdded(!productAdded);
								}}
								className=''
							>
								Add more of this product
							</button>
						</div>
					</div>
				)}
			</div>
		</motion.div>
	);
}
