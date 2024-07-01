import { Metadata, ResolvingMetadata } from 'next';
import Home from "./home.tsx";
import { getMetadata, isServiceSlug } from "@/app/lib/tabs.tsx";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page() {
	return (
		<Home/>
	);
}

export async function generateMetadata({params, searchParams}: Props, parent: ResolvingMetadata): Promise<Metadata> {
	if (searchParams.service && isServiceSlug(searchParams.service as string))
		return getMetadata(searchParams.service as string)

	return {
		title: 'Eppy Tech Connecticut',
		description: 'An IT company in Darien, Connecticut (CT) providing managed services, help desk, data protection, cloud computing, VOIP phone systems, repair services, and buisiness IT support',
		keywords: ['Eppy', 'Tech', 'connecticut', 'ct']
	}
}
