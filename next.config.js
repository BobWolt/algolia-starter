/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'http://localhost:3000',
			'localhost',
			'res.cloudinary.com',
			'cdn.sanity.io',
		],
	},
	env: {
		NEXT_PUBLIC_ALGOLIA_ID: process.env.NEXT_PUBLIC_ALGOLIA_ID,
		NEXT_PUBLIC_ALGOLIA_API_KEY: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
	},
};

module.exports = nextConfig;
