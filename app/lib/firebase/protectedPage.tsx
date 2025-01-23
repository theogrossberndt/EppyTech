import { useContext, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ContextProvider, pathToParams } from "@/app/appProvider.tsx";
import FullScreenLoader from "@/app/lib/fullScreenLoader.tsx";

type ProtectedPageProps = {
	children: Array<React.ReactNode> | React.ReactNode;
	showLoading: boolean;
}

const ProtectedPage = ({children, showLoading = true}: ProtectedPageProps): React.ReactNode | Array<React.ReactNode> => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const context = useContext(ContextProvider);

	useEffect(() => {
		if (!context || context.userLoading)
			return;
		if (!context.user){
			console.log("User is not signed in");
			router.push("/signIn?" + pathToParams(pathname, searchParams));
		}
	}, [context]);

	if (!context)
		return showLoading ? (<FullScreenLoader/>) : (<></>);

	return (
		children
	)
}

export default ProtectedPage;
