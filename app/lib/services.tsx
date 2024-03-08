'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import debounce from 'lodash.debounce';
import styles from "./services.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

type ServicesProps = {
	services: Array<String>;
	headerHeight: number;
	children: Array<ReactElement>;
};

const Services = ({services, headerHeight, children}: ServicesProps): ReactElement => {
	const pheights: Array<number> = children.map(child => 0);
	const [heights, setHeights] = useState<Array<number>>(pheights);
	const scrollParentRef = useRef<HTMLDivElement>(null)
	const cardRef = useRef<HTMLDivElement>(null);

	const [selected, setSelected] = useState<number>(0);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onElementChanged = (element: HTMLDivElement, idx: number) => {
		if (element != null && element.offsetHeight != heights[idx])
			setHeights(heights => heights.map((el: number, elI: number) => (elI == idx ? element.offsetHeight : el)));
	}

	const calculateMaxHeight = () => {
		let newMaxHeight: number = 0;
		heights.forEach((height: number) => {
			if (height > newMaxHeight)
				newMaxHeight = height;
		});
		if (newMaxHeight > 0)
			setIsOpen(true);
		if (isOpen)
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

	const canShow: boolean = maxHeight > 0 && isOpen;

	return (
			<div className={styles.servicesCard} ref={cardRef}>
				<div className={[styles.dropDown, styles.animatedMaxHeight].join(" ")} onClick={maxHeight < 0 ? false : () =>
					setIsOpen(prevOpen => {
						if (!prevOpen){
							const int = setInterval(() => {
								window.scrollTo({top: cardRef.current.offsetTop-headerHeight-8});
							}, 20);
							setTimeout(() => clearInterval(int), 1000);
						}
						return !prevOpen;
					})
				}>
					<h1 style={{color: "#fff"}}>Our Services</h1>
					<FontAwesomeIcon icon={faCaretDown} className={[styles.caretIcon, canShow ? styles.flipped : ""].join(" ")}/>
				</div>
				<div className={styles.servicesBody}>
					<div className={[styles.servicesSelect, styles.animatedMaxHeight].join(" ")} style={canShow ? {maxHeight: maxHeight} : {maxHeight: 0}}>
						{services.map((service, idx) => (
							<div className={styles.serviceOptionWrapper} key={idx}>
								<div
									className={[styles.serviceOption].join(" ")}
									style={selected == idx ? {backgroundColor: '#4977bb', color: '#fff'} : {}}
									onClick={() => {
										setSelected(idx);
										scrollParentRef.current.scroll({top: idx*maxHeight, behavior: "smooth"});
									}}
								>{service.toUpperCase()}</div>
								<div className={styles.flag} style={selected == idx ? {backgroundColor: '#7AB4EA'} : {}}></div>
							</div>
						))}
					</div>
					<div className={[styles.infoParent, styles.animatedMaxHeight].join(" ")} style={canShow ? {maxHeight: maxHeight} : {maxHeight: 0}} ref={scrollParentRef}>
						{children.map((child, idx) => (
							<div className={[styles.servicesInfo].join(" ")} ref={element => onElementChanged(element, idx)} style={{minHeight: maxHeight}} key={idx}>
								{child}
							</div>
						))}
					</div>
				</div>
			</div>
	);
}

export default Services;
