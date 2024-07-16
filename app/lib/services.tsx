'use client';

import { Fragment, useContext, useEffect, useMemo, useState, useRef } from 'react';
import Link from 'next/link';
import debounce from 'lodash.debounce';
import styles from "./services.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ContextProvider } from "@/app/appProvider.tsx";
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedIcon from '@/app/lib/animatedIcon.tsx';
import ConditionallyClickableLink from '@/app/lib/conditionallyClickableLink.tsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { getServiceSlug, slugToIdx } from '@/app/lib/tabs.tsx';

type ServicesProps = {
	services: Array<string>;
	children: Array<React.ReactNode>;
};

type DirectionType = {
	direction: -1 | 1;
	oldHeight: number;
	newIdx: number;
}

const Services = ({services, children}: ServicesProps): React.ReactElement => {
	const context = useContext(ContextProvider);

	const router = useRouter();
	const searchParams = useSearchParams();
	const serviceSlug = searchParams.get('service') ?? getServiceSlug(0);
	console.log("Service slug: ", serviceSlug);

	const [selected, setSelected] = useState<number>(slugToIdx(serviceSlug));
	const [direction, setDirection] = useState<DirectionType>();
	const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

	const headerTextRef = useRef<HTMLButtonElement>(null);
	const servicesSelectRef = useRef<HTMLDivElement>(null);

	const pheights: Array<number> = children.map(child => 0);
	const [heights, setHeights] = useState<Array<number>>(pheights);
	const [width, setWidth] = useState<number>(0);
	const [remSize, setRemSize] = useState<number>(parseInt(getComputedStyle(document.documentElement).fontSize));
	const [calculateSize, setCalculateSize] = useState<boolean>(true);

	const onElementChanged = (element: HTMLDivElement | null, idx: number): void => {
		if (element != null && element.offsetHeight != heights[idx]){
			setHeights(heights => heights.map((el: number, elI: number): number => (elI == idx ? element.offsetHeight : el)));
			if (element.offsetWidth != width)
				setWidth(element.offsetWidth);
			console.log("el width", element.offsetWidth);
			console.log("el height", idx, element.offsetHeight);
		}
	}

	const calculateMaxHeight = (): number => {
		let newMaxHeight: number = 0;
		let hasZero: boolean = false;
		heights.forEach((height: number): void => {
			if (height > newMaxHeight)
				newMaxHeight = height;
			if (height <= 0)
				hasZero = true;
		});
		if (!hasZero)
			setCalculateSize(false);
		return newMaxHeight;
	};

	const maxHeight: number = useMemo(calculateMaxHeight, [heights, setCalculateSize]);

	const debouncedCallback = useMemo(() => debounce(() => {
		console.log("calculating");
		const newRemSize: number = parseInt(getComputedStyle(document.documentElement).fontSize);
		if (remSize != newRemSize){
			console.log("setting rem to", newRemSize);
			setRemSize(newRemSize);
		}
		setHeights(pheights);
		setCalculateSize(true);
	}, 300, {leading: false, trailing: true}), [setHeights, setCalculateSize, setRemSize, pheights, remSize])

	console.log("Calculating size: ", calculateSize);

	useEffect(() => {
		console.log("effect added");
		window.addEventListener('resize', debouncedCallback);
		return () => {
			console.log("effect removed");
			window.removeEventListener('resize', debouncedCallback);
			debouncedCallback.cancel();
		};
	}, []);

	const canShow: boolean = maxHeight > 0;
	console.log(direction);

	const scrollTo = (idx: number) => {
		console.log(selected, idx);
		setDirection({direction: selected < idx ? 1 : -1, oldHeight: heights[selected], newIdx: idx});
		setSelected(idx);
	}

	const longTransition={duration: 1.0, ease: [0.65, 0, 0.35, 1]};

	if (!context)
		return (<div/>);

	if (context && context.singleCol){
		const transition={duration: 0.5, ease: [0.65, 0, 0.35, 1]};

		const scrollVariants = {
			initial: (custom: DirectionType) => (custom ? {
				y: (custom.direction < 0 ? -1*heights[custom.newIdx]-2*remSize : custom.oldHeight+2*remSize) + "px"
			} : {
				opacity: 0
			}),
			target: {
				y: "0px",
				opacity: 1
			},
			exit: (custom: DirectionType) => (custom ? {
				y: (custom.direction > 0 ? -1 : 1) * (Math.max(heights[custom.newIdx], custom.oldHeight)+2*remSize) + "px"
			} : {
				opacity: 0
			}),
		}

		const headerScrollVariants = {
			initial: (custom: DirectionType) => (custom ? {
				y: (custom.direction < 0 ? -1 : 1) * (headerTextRef.current == null ? (5.125*remSize) : headerTextRef.current.offsetHeight) + "px"
			} : {
				opacity: 0
			}),
			target: {
				y: "0px",
				opacity: 1
			},
			exit: (custom: DirectionType) => (custom ? {
				y: (custom.direction < 0 ? 1 : -1) * (headerTextRef.current == null ? (5.125*remSize) : headerTextRef.current.offsetHeight) + "px"
			}: {
				opacity: 0
			}),
		}

		return (
			<div className={styles.servicesCard}>
				<button className={styles.dropDown} onClick={() => setMobileMenuOpen(isMenuOpen => !isMenuOpen)} ref={headerTextRef} style={{overflow: 'hidden', position: 'relative', cursor: 'pointer'}}>
					<div style={{height: '2rem'}}>
						<AnimatePresence initial={false} custom={direction}>
							{services.map((service, idx) => idx == selected && (
								<motion.div key={idx} style={{position: 'absolute', minHeight: '2rem'}}
									variants={headerScrollVariants} custom={direction} initial="initial" animate="target" exit="exit" transition={longTransition}
								>
									<h1 style={{color: "#fff", paddingBlock: '0.5rem', lineHeight: '1rem'}} key={idx}>{service.toUpperCase()}</h1>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
					<AnimatedIcon selected={mobileMenuOpen ? 1 : 0} style={{width: '2rem', height: '2rem'}}>
						<FontAwesomeIcon icon={faBars} style={{width: '2rem', height: '2rem', backgroundColor: '#4977bb', color: "#fff"}}/>
						<FontAwesomeIcon icon={faCaretDown} style={{width: '2rem', height: '2rem', backgroundColor: '#4977bb', color: "#fff"}}/>
					</AnimatedIcon>
				</button>
				<AnimatePresence>
					{mobileMenuOpen && (
						<motion.div animate={{height: 'auto', opacity: 1}} initial={{height: 0, opacity: 0}} exit={{height: 0, opacity: 0}} style={{overflow: 'hidden'}} transition={transition}>
							{services.map((service: string, idx: number) => (
								<Link className={[styles.dropDown, styles.darken].join(" ")} key={idx} style={idx == selected ? {backgroundColor: '#4977bb'}: {color: '#000'}}
									href={"/?service=" + getServiceSlug(idx)} scroll={false} replace shallow
									onClick={() => {
										setMobileMenuOpen(false);
										scrollTo(idx);
									}}>
										{service}
								</Link>
							))}
						</motion.div>
					)}
				</AnimatePresence>
				<div className={[styles.infoParent, styles.animatedMaxHeight].join(" ")} style={canShow ? {maxHeight: heights[selected], minHeight: heights[selected], position: 'relative'} : {maxHeight: 0}}>
					{calculateSize ? children.map((child, idx) => (
						<div className={styles.servicesInfo} key={idx} ref={(element: HTMLDivElement | null) => onElementChanged(element, idx)}>
							{child}
						</div>
					)) : (<AnimatePresence initial={false} custom={direction}>
						{children.map((child, idx) => idx == selected && (
							<motion.div className={styles.servicesInfo} key={idx} style={{position: 'absolute', minHeight: heights[idx]}}
								variants={scrollVariants} custom={direction} initial="initial" animate="target" exit="exit" transition={longTransition}
							>
								{child}
							</motion.div>
						))}
					</AnimatePresence>)
					}
				</div>
				<div className={styles.dropDown}>
					<h1 style={{color: '#fff', paddingBlock: '0.5rem', lineHeight: '1rem'}}>Our Services</h1>
					<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
						<ConditionallyClickableLink onClick={selected != 0 ? () => scrollTo(selected-1) : undefined} className={styles.scrollButtonHolder}
							href={selected != 0 ? "/?service=" + getServiceSlug(selected-1) : null} scroll={false} replace shallow>
							<FontAwesomeIcon icon={faArrowUp} style={selected == 0 ? {color: '#ccc', cursor: 'default'} : {}} className={styles.scrollButtons}/>
						</ConditionallyClickableLink>
						<ConditionallyClickableLink onClick={selected != services.length-1 ? () => scrollTo(selected+1) : undefined} className={styles.scrollButtonHolder}
							href={selected != services.length-1 ? "/?service=" + getServiceSlug(selected+1) : null} scroll={false} replace shallow>
							<FontAwesomeIcon icon={faArrowDown} style={selected == services.length-1 ? {color: '#ccc', cursor: 'default'}: {}} className={styles.scrollButtons}/>
						</ConditionallyClickableLink>
					</div>
				</div>
			</div>
		);
	}

	const variants = {
		initial: (custom: DirectionType) => (custom ? {
			y: custom.direction < 0 ? "-100%" : "100%"
		} : {
			opacity: 0
		}),
		target: {
			y: "0%",
			opacity: 1
		},
		exit: (custom: DirectionType) => (custom ? {
			y: custom.direction > 0 ? "-100%" : "100%"
		} : {
			opacity: 0
		}),
	}

	const keyDown = (e: KeyboardEvent) => {
		if (!servicesSelectRef.current)
			return;
		if (e.code == "ArrowDown"){
			e.preventDefault();
			let selectedChild: number = 0;
			[...servicesSelectRef.current.children].forEach((child: HTMLDivElement, idx: number) => {
				if (child.children[0].id == document.activeElement.id)
					selectedChild = idx;
			})
			servicesSelectRef.current.children[(selectedChild+1) % services.length].children[0].focus();
		} if (e.code == "ArrowUp"){
			e.preventDefault();
			let selectedChild: number = 0;
			[...servicesSelectRef.current.children].forEach((child: HTMLDivElement, idx: number) => {
				if (child.children[0].id == document.activeElement.id)
					selectedChild = idx;
			})
			servicesSelectRef.current.children[(services.length+selectedChild-1) % services.length].children[0].focus();
		}
	}

	return (
		<div className={styles.servicesCard}>
			<div className={[styles.dropDown, styles.animatedMaxHeight].join(" ")}>
				<h1 style={{color: "#fff"}} id="servicesLabel">Our Services</h1>
			</div>

			<div className={styles.servicesBody}>
				<div className={[styles.servicesSelect, styles.animatedMaxHeight].join(" ")} style={canShow ? {maxHeight: maxHeight+2*remSize} : {maxHeight: 0}}
					role="tablist" ariaLabelledBy="servicesLabel" ariaOrientation="vertical" tabIndex={0} ref={servicesSelectRef} onKeyDown={keyDown}
				>
					{services.map((service: string, idx: number) => (
						<div className={styles.serviceOptionWrapper} key={idx}>
							<Link
								className={styles.serviceOption}
								style={selected == idx ? {backgroundColor: '#4977bb', textDecoration: 'none'} : {textDecoration: 'none'}}
								onClick={() => scrollTo(idx)}
								href={"/?service=" + getServiceSlug(idx)} shallow replace scroll={false}
								role="tab"
								ariaSelected={selected == idx}
								ariaControls={"tab" + idx}
								id={"tabLabel" + idx}
								tabIndex={selected == idx ? 0 : -1}
							>
								<h1 style={{color: selected == idx ? '#fff' : '#000', fontSize: '1.5rem'}}>{service.toUpperCase()}</h1>
							</Link>
							<div className={styles.flag} style={selected == idx ? {backgroundColor: '#7AB4EA'} : {}}></div>
						</div>
					))}
				</div>

				<div className={[styles.infoParent, styles.animatedMaxHeight].join(" ")} style={canShow ? {maxHeight: maxHeight+2*remSize, minHeight: maxHeight+2*remSize} : {maxHeight: 0}}>
					{calculateSize ? children.map((child: React.ReactNode, idx: number) => (
							<div className={styles.servicesInfo} ref={(element: HTMLDivElement | null) => onElementChanged(element, idx)} key={idx} ariaHidden="true">
								{child}
							</div>
					)) : (
					<AnimatePresence initial={false} custom={direction}>
						{children.map((child, idx) => idx == selected && (
							<motion.div className={styles.servicesInfo} key={idx} style={{position: 'absolute', minHeight: maxHeight+2*remSize, minWidth: width}} variants={variants} custom={direction}
								initial="initial" animate="target" exit="exit" transition={longTransition} role="tabpanel" id={"tab" + idx} ariaLabelledBy={"tabLabel" + idx} tabIndex={0}
							>
								{child}
							</motion.div>
						))}
					</AnimatePresence>
					)}
				</div>
			</div>
		</div>
	);
}

export default Services;
