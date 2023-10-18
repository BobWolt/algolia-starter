import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

type Hit = {
	title: string;
	description: string;
	price: string;
	image_url: string;
	id: string;
	properties: Array<{ name: string; value: any }>;
};

export function Hit(props: { hit: Hit }) {
	return (
		<Link href={'/products' + `?product_id=${props.hit.id}`}>
			<div className='relative md:w-[500px] w-80 flex flex-col justify-end md:h-96 h-48 overflow-hidden'>
				<motion.div
					whileHover={{ scale: 1.03 }}
					className='relative w-full md:h-96 h-48'
				>
					<Image
						className='z-10'
						fill
						objectFit='cover'
						src={props.hit.image_url}
						alt={'Image of a ' + props.hit.title}
					/>
				</motion.div>
				<div className='absolute w-full bottom-0 left-0 px-4 pt-24 pb-4 bg-gradient-to-t from-black to-transparent z-50 flex flex-col gap-2'>
					<h3>{props.hit.title}</h3>
					<h4 className='md:block hidden'>{props.hit.description}</h4>
					<span>{props.hit.price}</span>
				</div>
			</div>
		</Link>
	);
}
