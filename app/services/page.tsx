import { Metadata, ResolvingMetadata } from 'next';
import Home from "@/app/home.tsx";
import { getMetadata, isServiceSlug } from "@/app/lib/tabs.tsx";
import { useRouter } from 'next/router';

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({params}: {params: {slug: string}}) {
	console.log(params.slug);

	if (!isServiceSlug(params.slug))
		return (<Home/>)

	return (
		<Home selected={params.slug}/>
	);
}

export async function generateMetadata({params, searchParams}: Props, parent: ResolvingMetadata): Promise<Metadata> {
	return getMetadata(params.slug);
}
