'use client';
import './globals.css';
import { Inter } from 'next/font/google';

import { CartContextProvider } from './components/CartContextProvider';
import { NavBar } from './components/navBar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className + ' bg-black overflow-x-hidden'}>
				<CartContextProvider>
					<NavBar />
					{children}
				</CartContextProvider>
			</body>
		</html>
	);
}
