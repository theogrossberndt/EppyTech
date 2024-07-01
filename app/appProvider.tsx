"use client";

import { createContext, useEffect, useState } from 'react';

type AppProviderProps = {
	children: Array<React.ReactNode> | React.ReactNode;
}

type ValueType = {
	singleCol: boolean;
	isMobile: boolean;
}

export const ContextProvider = createContext<ValueType | null>(null);

const AppProvider = ({children}: AppProviderProps): React.ReactNode => {
	const [value, setValue] = useState<ValueType | null>(null);

	const handleResize = (): void => {
		console.log("Inner width: ", window.innerWidth);
		setValue({singleCol: window.innerWidth < 1024, isMobile: window.innerWidth < 768});
	}

	const handleKey = (event: KeyboardEvent): void => {
		if (event.code == "Space" || event.code == "Enter"){
			console.log(document.activeElement?.tagName, event.code);
			if (document.activeElement?.tagName == 'DIV'){
				console.log("CLICK");
				(document.activeElement as HTMLDivElement)?.click();
			}
		}
	}

	useEffect(() => {
		if (!window)
			return;
		window.addEventListener("resize", handleResize);
		document.addEventListener("keydown", handleKey);
		handleResize();
		return () => {
			window.removeEventListener("resize", handleResize);
			document.removeEventListener("keydown", handleKey);
		}
	}, []);

	return  (
		<ContextProvider.Provider value={value}>
			{children}
		</ContextProvider.Provider>
	);
}

export default AppProvider;
