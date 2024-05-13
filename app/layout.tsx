import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/app/appProvider.tsx";

const inter = Inter({ subsets: ["latin"] });

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
