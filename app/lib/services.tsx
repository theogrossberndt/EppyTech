'use client';

import { useLayoutEffect, useEffect, useMemo, useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import debounce from 'lodash.debounce';
import styles from "./services.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

type ServicesProps = {
	services: Array<String>;
	children: Array<ReactElement>;
};

const Services = ({services, children}: ServicesProps): ReactElement => {
	let refs = []
	children.forEach(child => refs.push(useRef(null)));
	const scrollParentRef = useRef(null);

	const [selected, setSelected] = useState(0);
	const [maxHeight, setMaxHeight] = useState(-1);
	const [isOpen, setIsOpen] = useState(false);

	const calculateMaxHeight = () => {
		let newMaxHeight = 0;
		refs.forEach(ref => {
			if (ref.current.offsetHeight > newMaxHeight)
				newMaxHeight = ref.current.offsetHeight;
		});
		setMaxHeight(newMaxHeight);
		return newMaxHeight;
	}

	const resetAndCalcHeight = () => {
		flushSync(() => setMaxHeight(0));
		const newMaxHeight = calculateMaxHeight();
		scrollParentRef.current.scrollTo(0, selected*newMaxHeight);
	}

	const debouncedCallback = useMemo(() => debounce(resetAndCalcHeight, 300), [setMaxHeight, refs, scrollParentRef, selected])

	useLayoutEffect(() => {
		window.addEventListener('resize', debouncedCallback);
		if (maxHeight < 0){
			calculateMaxHeight();
			setIsOpen(true);
		} else
			calculateMaxHeight();
		return () => {
			window.removeEventListener('resize', debouncedCallback);
			debouncedCallback.cancel();
		};
	}, [maxHeight, setIsOpen, calculateMaxHeight, debouncedCallback]);

	const canShow = maxHeight > 0 && isOpen;

	return (
			<div className={styles.servicesCard}>
				<div className={[styles.dropDown, styles.animatedMaxHeight].join(" ")} onClick={maxHeight < 0 ? false : () => setIsOpen(prevOpen => !prevOpen)}>
					<h1 style={{color: "#fff"}}>Our Services</h1>
					<FontAwesomeIcon icon={faCaretDown} className={[styles.caretIcon, canShow ? styles.flipped : ""].join(" ")}/>
				</div>
				<div className={styles.servicesBody}>
					<div className={[styles.servicesSelect, styles.animatedMaxHeight].join(" ")} style={canShow ? {maxHeight: maxHeight} : {maxHeight: 0}}>
						{services.map((service, idx) => (
							<div className={styles.serviceOptionWrapper}>
								<div
									className={[styles.serviceOption].join(" ")}
									key={idx}
									style={selected == idx ? {backgroundColor: '#4977bb', color: '#fff'} : {}}
									onClick={() => {
										setSelected(idx);
										scrollParentRef.current.scrollTo(0, idx*maxHeight);
									}}
								>{service.toUpperCase()}</div>
								<div className={styles.flag} style={selected == idx ? {backgroundColor: '#7AB4EA'} : {}}></div>
							</div>
						))}
					</div>
					<div className={[styles.infoParent, styles.animatedMaxHeight].join(" ")} style={canShow ? {maxHeight: maxHeight} : {maxHeight: 0}} ref={scrollParentRef}>
						{children.map((child, idx) => (
							<div className={[styles.servicesInfo].join(" ")} ref={refs[idx]} style={{minHeight: maxHeight}}>
								{child}
							</div>
						))}
					</div>
				</div>
			</div>
	);
}

export default Services;
