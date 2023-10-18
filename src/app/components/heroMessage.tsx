export function HeroMessage() {
	return (
		<div className='w-full flex flex-col items-center gap-12'>
			<h1 className='text-7xl text-center font-bold'>
				A simple webshop starter
			</h1>

			<div className='max-w-[800px] w-full p-8 bg-white/10 border border-white/20 rounded-lg'>
				<p className=''>
					This webshop starter is powered 100% by{' '}
					<a
						href='https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/'
						target='_blank'
						className='text-pink-600 underline'
					>
						Algolia React InstantSearch
					</a>
					. Built with Typescript, NextJS, and TailwindCSS.
					<br></br>
					<br></br>
					The available products come directly from an Algolia search index and
					are searchable and able to be added to a cart. No CMS required.
					<br></br>
					<br></br>
					This starter showcases the potential Algolia has out of the box and
					may serve as a starting point for a custom and simple webshop
					experience.
					<br></br>
					<br></br>
					<span className='text-xs'>
						Get the{' '}
						<a
							href='https://github.com/BobWolt/algolia-starter'
							target='_blank'
							className='text-pink-600 underline'
						>
							Source
						</a>
						.
					</span>
				</p>
			</div>
		</div>
	);
}
