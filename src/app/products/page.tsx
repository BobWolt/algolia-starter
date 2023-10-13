'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';

import { HitFullPage } from '../components/hitFullPage';

const client = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_ID,
	process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);
export default function Products() {
	const searchParams = useSearchParams();
	const productId = searchParams.get('product_id');
	return (
		<main className='md:pb-0 pb-24 flex flex-col items-center justify-between h-full overflow-x-hidden '>
			<div className='z-10 w-full flex flex-col items-center justify-between font-mono text-sm lg:flex'>
				<InstantSearch
					indexName='test'
					searchClient={client}
					// limit hitsPerPage to 1 to only show intended product
					// pre-load the SearchBox with the productId as query
					initialUiState={{
						test: {
							query: `${productId}`,
							hitsPerPage: 1,
						},
					}}
				>
					<SearchBox
						// 'hidden' class on SearchBox root to hide it completely
						className='hidden'
						classNames={{
							root: 'p-3 shadow-sm',
							form: 'relative',
							input:
								'block w-full pl-9 pr-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1',
							submitIcon: 'absolute top-0 left-0 bottom-0 w-6',
						}}
					/>
					<Hits hitComponent={HitFullPage} />
				</InstantSearch>
			</div>
		</main>
	);
}
