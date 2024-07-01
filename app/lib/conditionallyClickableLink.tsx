import Link, {LinkProps} from 'next/link';

type ConditionallyClickableLinkProps = {
	children?: React.ReactNode | Array<React.ReactNode>;
	onClick?: React.MouseEventHandler<HTMLElement>;
	underline?: boolean;
	style?: React.CSSProperties;
	className?: string;
	href?: string | null;
} & Omit<LinkProps, 'href'>;

const ConditionallyClickableLink = ({style, href, className, children, onClick, underline, ...others}: ConditionallyClickableLinkProps): React.ReactElement => {
	const newStyle = style ?? {};
	const shallow = others.shallow ?? false;
	const replace = others.replace ?? false;
	const scroll = others.scroll ?? true;
	underline = underline ?? false;
	if (href)
		return (
			<Link {...others} style={underline ? newStyle : {...newStyle, textDecoration: 'none'}} onClick={onClick} shallow={shallow} replace={replace} scroll={scroll} href={href} className={className}>
				{children}
			</Link>
		);
	else
		return (
			<div style={style} className={className} onClick={onClick}>
				{children}
			</div>
		);
}

export default ConditionallyClickableLink;
