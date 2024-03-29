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
			<body className={inter.className} suppressHydrationWarning>
				<AppProvider>
					{children}
				</AppProvider>
			</body>
		</html>
	);
}
