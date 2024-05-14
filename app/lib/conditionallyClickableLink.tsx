import Link from 'next/link';

type ConditionallyClickableLinkProps = {
	children?: React.ReactNode | Array<React.ReactNode>;
	style?: React.CSSProperties;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	href?: string;
	shallow?: boolean;
	replace?: boolean;
	scroll?: boolean;
	underline?: boolean;
};

const ConditionallyClickableLink = ({children, style, className, onClick, href, shallow, replace, scroll, underline}: ConditionallyClickableLinkProps): React.ReactElement => {
	style = style ?? {};
	shallow = shallow ?? false;
	replace = replace ?? false;
	scroll = scroll ?? true;
	underline = underline ?? false;
	if (href)
		return (
			<Link style={underline ? style : {...style, textDecoration: 'none'}} className={className} onClick={onClick} href={href} shallow={shallow} replace={replace} scroll={scroll}>
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
