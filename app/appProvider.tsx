"use client";

import { createContext, React, useEffect, useState } from 'react';

type AppProviderProps = {
	children: Array<React.ReactNode>;
}

export const ContextProvider = createContext(null);

const AppProvider = ({children}: AppProviderProps): React.ReactNode => {
	const [value, setValue] = useState<>(null);

	const handleResize = () => {
		console.log("Inner width: ", window.innerWidth);
		setValue({singleCol: window.innerWidth < 1024, isMobile: window.innerWidth < 768});
	}

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(handleResize, [window.innerWidth]);

	return  (
		<ContextProvider.Provider value={value}>
			{children}
		</ContextProvider.Provider>
	);
}

export default AppProvider;
