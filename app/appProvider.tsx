"use client";

import type { ReadOnlyURLSearchParams, URLSearchParams } from 'url';
import { createContext, useEffect, useState } from 'react';
import { User as FirebaseUser, Auth as FirebaseAuth, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/lib/firebase/init.tsx";

type AppProviderProps = {
	children: Array<React.ReactNode> | React.ReactNode;
}

type ContextType = {
	singleCol: boolean;
	isMobile: boolean;
	auth: FirebaseAuth;
	user: FirebaseUser;
	userLoading: boolean;
}

const forceSignin = true;

export const ContextProvider = createContext<ContextType | null>(null);

const AppProvider = ({children}: AppProviderProps): React.ReactNode => {
	const [value, setValue] = useState<ContextType | null>(null);

	const handleResize = (init: boolean = false): void => {
		console.log("Inner width: ", window.innerWidth);
		setValue((value: ContextType | null): ContextType => ({
			singleCol: window.innerWidth < 1024,
			isMobile: window.innerWidth < 768,
			user: init ? null : value?.user,
			auth: init ? null : value?.auth,
			userLoading: init ? true : value?.userLoading
		}));
	}

	const handleKey = (event: KeyboardEvent): void => {
		if (event.code == "Space" || event.code == "Enter"){
			console.log(document.activeElement?.tagName, event.code);
			if (document.activeElement?.tagName == 'DIV'){
				console.log("CLICK");
				event.preventDefault();
				(document.activeElement as HTMLDivElement)?.click();
			}
		}
	}

	useEffect(() => {
		if (!window)
			return;
		window.addEventListener("resize", handleResize);
		document.addEventListener("keydown", handleKey);

		handleResize(true);
		onAuthStateChanged(auth, (newUser: FirebaseUser) => {
			setValue((value: ContextType | null): ContextType => ({...value, user: newUser, auth: auth, userLoading: false}));
		})

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

const redirectIdToPath = {
	'0': '/',
	'1': '/internalTools'
}

export const getPathFromParams = (roSearchParams: ReadOnlyURLSearchParams) : string => {
	const searchParams: URLSearchParams = new URLSearchParams(roSearchParams.toString());
	if (!searchParams.has('redirect'))
		return "/";
	const redirectId = searchParams.get('redirect')
	if (!(redirectId in redirectIdToPath))
		return "/";
	searchParams.delete('redirect');
	const queryString = searchParams.toString();
	return redirectIdToPath[redirectId] + (queryString.length <= 0 ? "" : "?"+queryString);
}

export const pathToParams = (pathname: string, roSearchParams: ReadOnlyURLSearchParams): string => {
	const searchParams: URLSearchParams = new URLSearchParams(roSearchParams.toString());
	const redirectId = Object.keys(redirectIdToPath).find((key: string): string => redirectIdToPath[key] === pathname);
	if (!redirectId)
		return 'redirect=0';
	searchParams.set('redirect', redirectId);
	return searchParams.toString();
}
