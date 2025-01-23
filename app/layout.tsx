// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import type { Metadata } from "next";
//import { Maven_Pro } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import AppProvider from "@/app/appProvider.tsx";

//const inter = Dancing_Script({ subsets: ["latin"] });
// TODO: Look into self hosting font for faster load time
// https://fonts.google.com/knowledge/using_type/self_hosting_web_fonts
//const inter = Maven_Pro({ subsets: ["latin"] });
const inter = localFont({src: './Maven.ttf'})

export const metadata: Metadata = {
  title: "Eppy Tech",
  description: "A website for Eppy Tech in Darien, CT"
};

type RootProps = {
	children: Array<React.ReactNode>;
};

export default function RootLayout({children}: RootProps) {
	return (
		<html lang="en">
			<head>
				<meta name="google-site-verification" content="PcIZ5-l7B29bGroKf-42U2uPV-YkNJ-D5EV-agz6ts0"/>
			</head>
			<body className={inter.className} suppressHydrationWarning>
				<AppProvider>
					{children}
				</AppProvider>
			</body>
		</html>
	);
}
