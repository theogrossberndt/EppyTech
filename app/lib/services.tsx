'use client';

import { useEffect, useState, useRef } from 'react';
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
	const [maxHeight, setMaxHeight] = useState(0);

	useEffect(() => {
		let newMaxHeight = 0;
		refs.forEach(ref => {
			if (ref.current.offsetHeight > newMaxHeight)
				newMaxHeight = ref.current.offsetHeight;
		});
		setMaxHeight(newMaxHeight);
	});

	return (
			<div className={styles.servicesCard}>
				<div className={styles.servicesBody}>
					<div className={[styles.servicesSelect, styles.animatedMaxHeight].join(" ")} style={maxHeight <= 0 ? {maxHeight: 0} : {maxHeight: maxHeight}}>
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
					<div className={[styles.infoParent, styles.animatedMaxHeight].join(" ")} style={maxHeight > 0 ? {"maxHeight": maxHeight} : {maxHeight: 0}} ref={scrollParentRef}>
						{children.map((child, idx) => (
							<div className={[styles.servicesInfo, styles.animatedMaxHeight].join(" ")} ref={refs[idx]} style={maxHeight > 0 ? {"minHeight": maxHeight} : {maxHeight: 0}}>
								{child}
							</div>
						))}
					</div>
				</div>
			</div>
	);
}

/*
				<div className={[styles.dropDown, styles.animatedMaxHeight, maxHeight <= 0 ? styles.fullRound : ""].join(" ")} style={maxHeight <= 0 ? {maxHeight: 0, boxShadow: "none"} : {maxHeight: maxHeight}}>
					<h1 style={{color: "#fff"}}>Our Services</h1>
					<FontAwesomeIcon icon={faCaretDown} style={{width: '1.5rem', height: '1.5rem'}}/>
				</div>
				{services.map((service, idx) => (
						<div className={[styles.serviceOptionWrapper].join(" ")}>
							<div
								className={styles.serviceOption}
								key={idx}
								style={selected == idx ? {backgroundColor: '#4977bb', color: '#fff'} : []}
								onClick={() => {
									setSelected(idx);
									refs[idx].current.scrollIntoView();
								}}
							>{service.toUpperCase()}</div>
							<div className={styles.flag} style={selected == idx ? {backgroundColor: '#7AB4EA'} : []}></div>
						</div>
					)
				)}

*/

export default Services;
