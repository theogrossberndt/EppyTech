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
import AnimatedIcon from '@/app/lib/animatedIcon.tsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { getServiceSlug, slugToIdx } from '@/app/lib/tabs.tsx';

type ServicesProps = {
	services: Array<string>;
	headerHeight: number;
	children: Array<React.ReactNode>;
};

const Services = ({services, headerHeight, children}: ServicesProps): React.ReactElement => {
	const context = useContext(ContextProvider);
	if (!context)
		return (<div/>);

	const router = useRouter();
	const searchParams = useSearchParams();
	const serviceSlug = searchParams.get('service') ?? getServiceSlug(0);
	console.log(serviceSlug);

	const [selected, setSelected] = useState<number>(slugToIdx(serviceSlug));
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
	const [scrollHeight, setScrollHeight] = useState<number>(0);

	const scrollParentRef = useRef<HTMLDivElement>(null)
	const headerTextRef = useRef<HTMLDivElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);

	const pheights: Array<number> = children.map(child => 0);
	const [heights, setHeights] = useState<Array<number>>(pheights);
	const [remSize, setRemSize] = useState<number>(parseInt(getComputedStyle(document.documentElement).fontSize));

	const onElementChanged = (element: HTMLDivElement | null, idx: number): void => {
		if (element != null && element.offsetHeight != heights[idx]){
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
		if (!context.singleCol && newMaxHeight > 0)
			setIsOpen(true);
		if ((context.singleCol || isOpen) && scrollParentRef.current != null)
			scrollParentRef.current.scroll({top: selected*newMaxHeight, behavior: "instant"});
		return newMaxHeight;
	};

	const maxHeight: number = useMemo(calculateMaxHeight, [heights, setIsOpen, scrollParentRef]);

	const debouncedCallback = useMemo(() => debounce(() => {
		if (context.singleCol){
			const newRemSize: number = parseInt(getComputedStyle(document.documentElement).fontSize);
			if (remSize != newRemSize){
				console.log("setting rem to", newRemSize);
				setRemSize(newRemSize);
			}
		}
		setHeights(pheights);
	}, 300, {leading: true, trailing: false}), [setHeights])

	useEffect(() => {
		window.addEventListener('resize', debouncedCallback);
		return () => {
			window.removeEventListener('resize', debouncedCallback);
			debouncedCallback.cancel();
		};
	}, []);

	const scrollTo = (idx: number) => {
		setSelected(idx);
		router.push('/?service=' + getServiceSlug(idx), {scroll: false});
	}

	useEffect(() => {
		if (!scrollParentRef.current)
			return;
		if (context.singleCol && !headerTextRef.current)
			return;
		if (context.singleCol)
			headerTextRef.current.scroll({top: selected * 2 * remSize, behavior: 'smooth'});
		scrollParentRef.current.scroll({top: selected*maxHeight, behavior: 'smooth'});
	}, [selected, headerTextRef.current, scrollParentRef.current]);

	if (context.singleCol){
		const canShow: boolean = maxHeight > 0;
		const transition={duration: 0.5, ease: [0.65, 0, 0.35, 1]};


		return (
			<div className={styles.servicesCard}>
				<button className={styles.dropDown} onClick={() => setIsOpenMobile(isOpen => !isOpen)} style={{cursor: 'pointer'}}>
					<div style={{overflow: 'hidden', height: '2rem', textAlign: 'left'}} ref={headerTextRef}>
						{services.map((service, idx) => (
							<h1 style={{color: "#fff", paddingBlock: '0.5rem', lineHeight: '1rem'}} key={idx}>{service.toUpperCase()}</h1>
						))}
					</div>
					<AnimatedIcon selected={isOpenMobile ? 1 : 0} style={{width: '2rem', height: '2rem'}}>
						<FontAwesomeIcon icon={faBars} style={{width: '2rem', height: '2rem', backgroundColor: '#4977bb', color: "#fff"}}/>
						<FontAwesomeIcon icon={faCaretDown} style={{width: '2rem', height: '2rem', backgroundColor: '#4977bb', color: "#fff"}}/>
					</AnimatedIcon>
				</button>
				<AnimatePresence>
					{isOpenMobile && (
						<motion.div animate={{height: 'auto', opacity: 1}} initial={{height: 0, opacity: 0}} exit={{height: 0, opacity: 0}} style={{overflow: 'hidden'}} transition={transition}>
							{services.map((service: string, idx: number) => (
								<button className={styles.dropDown} key={idx} style={idx == selected ? {backgroundColor: '#7a9ccd'} : {}} onClick={() => {
									setIsOpenMobile(false);
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
						<div style={{height: maxHeight}}>
							<div className={styles.servicesInfo} ref={(element: HTMLDivElement | null) => onElementChanged(element, idx)} key={idx} style={{position: 'relative'}}>
								<div style={{position: 'absolute', bottom: '1rem', right: '1rem'}}>
									<div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', opacity: 0.5}}>
										<button className={styles.scrollButtonHolder} onClick={idx != 0 ? () => scrollTo(idx-1) : undefined}>
											<FontAwesomeIcon icon={faCaretUp} style={idx == 0 ? {backgroundColor: '#f0f0f0', cursor: 'default'} : {}} className={styles.scrollButtons}/>
										</button>
										<button className={styles.scrollButtonHolder} onClick={idx != services.length-1 ? () => scrollTo(idx+1) : undefined}>
											<FontAwesomeIcon icon={faCaretDown} style={idx == services.length-1 ? {backgroundColor: '#f0f0f0', cursor: 'default'}: {}} className={styles.scrollButtons}/>
										</button>
									</div>
								</div>
								{child}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

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
			<div className={[styles.dropDown, styles.animatedMaxHeight].join(" ")}>
				<h1 style={{color: "#fff"}}>Our Services</h1>
			</div>
			<div className={styles.servicesBody}>
				<div className={[styles.servicesSelect, styles.animatedMaxHeight].join(" ")} style={canShow ? {maxHeight: maxHeight} : {maxHeight: 0}}>
					{services.map((service: string, idx: number) => (
						<div className={styles.serviceOptionWrapper} key={idx}>
							<div
								className={styles.serviceOption}
								style={selected == idx ? {backgroundColor: '#4977bb', color: '#fff'} : {}}
								onClick={() => scrollTo(idx)}
							>{service.toUpperCase()}</div>
							<div className={styles.flag} style={selected == idx ? {backgroundColor: '#7AB4EA'} : {}}></div>
						</div>
					))}
				</div>
				<div className={[styles.infoParent, styles.animatedMaxHeight].join(" ")} style={canShow ? {maxHeight: maxHeight} : {maxHeight: 0}} ref={scrollParentRef}>
					{children.map((child: React.ReactNode, idx: number) => (
						<div style={{height: maxHeight, position: 'relative'}}>
							<div className={styles.servicesInfo} ref={(element: HTMLDivElement | null) => onElementChanged(element, idx)} key={idx}>
								<div style={{position: 'absolute', bottom: '1rem', right: '1rem'}}>
									<div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', opacity: maxHeight - heights[idx] < (8.5*remSize) ? 0.5 : 1.0}}>
										<button className={styles.scrollButtonHolder} onClick={idx != 0 ? () => scrollTo(idx-1) : undefined}>
											<FontAwesomeIcon icon={faCaretUp} style={idx == 0 ? {backgroundColor: '#f0f0f0', cursor: 'default'} : {}} className={styles.scrollButtons}/>
										</button>
										<button className={styles.scrollButtonHolder} onClick={idx != services.length-1 ? () => scrollTo(idx+1) : undefined}>
											<FontAwesomeIcon icon={faCaretDown} style={idx == services.length-1 ? {backgroundColor: '#f0f0f0', cursor: 'default'}: {}} className={styles.scrollButtons}/>
										</button>
									</div>
								</div>
								{child}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Services;
