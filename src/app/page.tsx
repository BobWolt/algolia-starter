'use client';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';

import { HeroMessage } from './components/heroMessage';
import { Hit } from './components/hit';

const client = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_ID,
	process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

export default function Home() {
	return (
		<main className='container mx-auto flex min-h-screen flex-col items-center justify-between md:p-24 p-4 pt-24 pb-24'>
			<div className='z-10 w-full flex flex-col gap-24 items-center justify-between font-mono text-sm lg:flex '>
				<HeroMessage />

				<div className='flex flex-col items-center'>
					<InstantSearch indexName='test' searchClient={client}>
						<SearchBox
							placeholder='Search our amazing products'
							classNames={{
								root: 'p-3 shadow-sm',
								form: 'relative',
								input:
									'block w-80 pl-9 pr-3 py-2 text-[#333] bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-blue-600 rounded-md focus:ring-1',
								submitIcon: 'absolute top-3 left-2 bottom-0 h-4 w-4',
							}}
						/>
						<Hits
							classNames={{
								list: 'grid md:grid-cols-2 grid-cols-1 gap-4',
							}}
							hitComponent={Hit}
						/>
					</InstantSearch>
				</div>
			</div>
		</main>
	);
}
