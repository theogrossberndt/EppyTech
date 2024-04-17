'use client';

import { Fragment, useContext, useEffect, useMemo, useState, useRef } from 'react';
import debounce from 'lodash.debounce';
import styles from "./services.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ContextProvider } from "@/app/appProvider.tsx";
import { AnimatePresence, motion } from 'framer-motion';

type ServicesProps = {
	services: Array<string>;
	headerHeight: number;
	children: Array<React.ReactNode>;
};

const Services = ({services, headerHeight, children}: ServicesProps): React.ReactElement => {
	const context = useContext(ContextProvider);
	if (!context)
		return (<div/>);

	const [selected, setSelected] = useState<number>(0);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const scrollParentRef = useRef<HTMLDivElement>(null)

	const pheights: Array<number> = children.map(child => 0);
	const [heights, setHeights] = useState<Array<number>>(pheights);
	const [paddings, setPaddings] = useState<Array<number>>(pheights);

	const onElementChanged = (element: HTMLDivElement | null, idx: number): void => {
		if (element != null && element.offsetHeight != heights[idx]){
			const cs = getComputedStyle(element);
			var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
			var borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

			setPaddings(paddings => paddings.map((el: number, elI: number): number => (elI == idx ? paddingY+borderY : el)));
			setHeights(heights => heights.map((el: number, elI: number): number => (elI == idx ? element.offsetHeight : el)));
			console.log("el height", idx, element.offsetHeight);
		}
	}

	const calculateMaxHeight = (): number => {
		let newMaxHeight: number = 0;
		heights.forEach((height: number): void => {
			if (height > newMaxHeight)
				newMaxHeight = height;
		});
		if (!context.isMobile && newMaxHeight > 0)
			setIsOpen(true);
		if ((context.isMobile || isOpen) && scrollParentRef.current != null)
			scrollParentRef.current.scroll({top: selected*newMaxHeight, behavior: "instant"});
		return newMaxHeight;
	};

	const maxHeight: number = useMemo(calculateMaxHeight, [heights, setIsOpen, scrollParentRef]);

	const debouncedCallback = useMemo(() => debounce(() => setHeights(pheights), 300, {leading: true, trailing: false}), [setHeights])

	useEffect(() => {
		window.addEventListener('resize', debouncedCallback);
		return () => {
			window.removeEventListener('resize', debouncedCallback);
			debouncedCallback.cancel();
		};
	}, []);


	if (context.isMobile){
		const headerTextRef = useRef<HTMLDivElement>(null);
		const [headerTextHeight, setHeaderTextHeight] = useState<number>(0);

		const [scrollHeight, setScrollHeight] = useState<number>(0);
		const canShow: boolean = maxHeight > 0;

		const transition={duration: 0.5, ease: [0.65, 0, 0.35, 1]};
		const animate = {
			opacity: 1,
			rotate: '0deg',
			transition: transition
		}

		const inOut1 = {
			opacity: 0,
			rotate: '180deg',
			transition: transition
		}

		const inOut2 = {
			opacity: 0,
			rotate: '-180deg',
			transition: transition
		}

		const scrollTo = (idx: number) => {
			if (!scrollParentRef.current || !headerTextRef.current)
				return;
			setSelected(idx);
			headerTextRef.current.scroll({top: idx*headerTextHeight, behavior: 'smooth'});
			scrollParentRef.current.scroll({top: idx*maxHeight, behavior: 'smooth'});
		}

		return (
			<div className={styles.servicesCard}>
				<button className={styles.dropDown} onClick={() => setIsOpen(isOpen => !isOpen)}>
					<div style={{overflow: 'hidden', height: headerTextHeight, textAlign: 'left'}} ref={headerTextRef}>
						{services.map((service, idx) => (
							<h1 style={{color: "#fff", paddingVertical: '0.5rem'}} ref={el => {
								if (el != null)
									setHeaderTextHeight(el.offsetHeight);
							}}>{service.toUpperCase()}</h1>
						))}
					</div>
					<div style={{width: '2em', height: '2em', position: 'relative'}}>
						<AnimatePresence initial={false}>
							{isOpen ? (
								<motion.div animate={animate} initial={inOut1} exit={inOut1} key={0} style={{position: 'absolute'}}>
									<FontAwesomeIcon icon={faCaretDown} style={{width: '2em', height: '2em', backgroundColor: '#4977bb', color: "#fff"}}/>
								</motion.div>
							) : (
								<motion.div animate={animate} initial={inOut2} exit={inOut2} key={1} style={{position: 'absolute'}}>
									<FontAwesomeIcon icon={faBars} style={{width: '2em', height: '2em', backgroundColor: '#4977bb', color: "#fff"}}/>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</button>
				<AnimatePresence>
					{isOpen && (
						<motion.div animate={{height: 'auto', opacity: 1}} initial={{height: 0, opacity: 0}} exit={{height: 0, opacity: 0}} style={{overflow: 'hidden'}} transition={transition}>
							{services.map((service: string, idx: number) => (
								<button className={styles.dropDown} key={idx} onClick={() => {
									setIsOpen(false);
									scrollTo(idx);
								}}>
									{service}
								</button>
							))}
						</motion.div>
					)}
				</AnimatePresence>
				<div className={[styles.infoParent, styles.animatedMaxHeight].join(" ")} style={canShow ? {maxHeight: heights[selected]} : {maxHeight: 0}} ref={scrollParentRef}>
					{children.map((child: React.ReactNode, idx: number) => (
						<div style={{height: maxHeight}} key={idx}>
							<div className={styles.servicesInfo} ref={(element: HTMLDivElement | null) => onElementChanged(element, idx)} key={idx}>
								<div style={{float: 'right', width: 0, height: heights[idx]-paddings[idx]-scrollHeight}}></div>
								<div style={{float: 'right', clear: 'right', display: 'flex', flexDirection: 'column', gap: 20}} ref={element => {
									if (element != null)
										setScrollHeight(element.offsetHeight);
								}}>
									<button style={{border: 'none', background: 'none', marginLeft: '1rem'}} onClick={idx != 0 ? () => scrollTo(idx-1) : undefined}>
										<FontAwesomeIcon icon={faCaretUp} style={idx == 0 ? {backgroundColor: '#f0f0f0'} : {}} className={styles.scrollButtons}/>
									</button>
									<button style={{border: 'none', background: 'none', marginLeft: '1rem'}} onClick={idx != services.length-1 ? () => scrollTo(idx+1) : undefined}>
										<FontAwesomeIcon icon={faCaretDown} style={idx == services.length-1 ? {backgroundColor: '#f0f0f0'} : {}} className={styles.scrollButtons}/>
									</button>
								</div>
								{child}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
//							<div style={{float: 'right', height: heights[idx], display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>


	const cardRef = useRef<HTMLDivElement>(null);

	const canShow: boolean = maxHeight > 0 && isOpen;

	const toggleOpen = (prevOpen: boolean): boolean => {
		if (!prevOpen){
			const int = setInterval(() => {
				if (cardRef.current != null)
					window.scrollTo({top: cardRef.current.offsetTop-headerHeight-8});
			}, 20);
			setTimeout(() => clearInterval(int), 1000);
		}
		return !prevOpen;
	};

	return (
		<div className={styles.servicesCard} ref={cardRef}>
			<div className={[styles.dropDown, styles.animatedMaxHeight].join(" ")} onClick={maxHeight < 0 ? undefined : () => setIsOpen(toggleOpen)}>
				<h1 style={{color: "#fff"}}>Our Services</h1>
				<FontAwesomeIcon icon={faCaretDown} className={[styles.caretIcon, canShow ? styles.flipped : ""].join(" ")}/>
			</div>
			<div className={styles.servicesBody}>
				<div className={[styles.servicesSelect, styles.animatedMaxHeight].join(" ")} style={canShow ? {maxHeight: maxHeight} : {maxHeight: 0}}>
					{services.map((service: string, idx: number) => (
						<div className={styles.serviceOptionWrapper} key={idx}>
							<div
								className={styles.serviceOption}
								style={selected == idx ? {backgroundColor: '#4977bb', color: '#fff'} : {}}
								onClick={() => {
									setSelected(idx);
									if (scrollParentRef.current != null)
										scrollParentRef.current.scroll({top: idx*maxHeight, behavior: "smooth"});
								}}
							>{service.toUpperCase()}</div>
							<div className={styles.flag} style={selected == idx ? {backgroundColor: '#7AB4EA'} : {}}></div>
						</div>
					))}
				</div>
				<div className={[styles.infoParent, styles.animatedMaxHeight].join(" ")} style={canShow ? {maxHeight: maxHeight} : {maxHeight: 0}} ref={scrollParentRef}>
					{children.map((child: React.ReactNode, idx: number) => (
						<div className={styles.servicesInfo} ref={(element: HTMLDivElement | null) => onElementChanged(element, idx)} style={{minHeight: maxHeight}} key={idx}>
							{child}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Services;
