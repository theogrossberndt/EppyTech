"use client";

import { Fragment, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ChildMeasurer from "./childMeasurer.tsx";
import styles from "./slidingCard.module.css";
import { AnimatePresence, motion } from 'framer-motion';

const SlidingCard = forwardRef((props, ref) => {
	const cardRef = useRef(null);
	const [direction, setDirection] = useState<number>(1)
	const [selected, setSelected] = useState<number>(-1);
	const [maxDims, setMaxDims] = useState<>({width: 0, height: 0});
	const [cardDims, setCardDims] = useState<>({width: 0, height: 0});

	useImperativeHandle(ref, () => ({
		goForward(id){
			let newCurrentI: number = -1;
			props.children.forEach((child, idx) => {
				if (child.props.id == id)
					newCurrentI = idx;
			});
			if (newCurrentI < 0)
				console.error("Attempted to slide forward to unknown child with id: ", id);
			else {
				setSelected(newCurrentI);
				setDirection(1);
			}
		},

		goBackward(id){
			let newCurrentI: number = -1;
			props.children.forEach((child, idx) => {
				if (child.props.id == id)
					newCurrentI = idx;
			});
			if (newCurrentI < 0)
				console.error("Attempted to slide backward to unknown child with id: ", id);
			else {
				setSelected(newCurrentI);
				setDirection(-1);
			}
		}
	}));

	useEffect(() => {
		if (cardRef.current && (cardRef.current.offsetWidth != cardDims['width'] || cardRef.current.offsetHeight != cardDims['height'])){
			const cs = getComputedStyle(cardRef.current);
			var paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
			var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

			var borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
			var borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

			// Element width and height minus padding and border
			const availWidth = cardRef.current.offsetWidth - paddingX - borderX;
			const availHeight = cardRef.current.offsetHeight - paddingY - borderY;

			setCardDims({width: availWidth, height: availHeight});
		}
	}, [cardRef.current])

	const minNonZero = (...args) => {
		let min = null;
		args.forEach(arg => {
			if ((arg > 0 && min == null) || (arg > 0 && arg < min))
				min = arg;
		});
		return min == null ? 0 : min;
	}

	const setMaxDimsHandler = (childMaxDims) => {
		console.log("childMaxDims:", childMaxDims);
		if (maxDims.width == 0 || maxDims.height == 0){
			setSelected(0);
			setDirection(0);
		}

//		console.log("cdw", cardDims.width, "cmdw", childMaxDims.width, "mdw", maxDims.width);
		let newMaxWidth = minNonZero(cardDims.width, childMaxDims.width, maxDims.width);
//		console.log("cdh", cardDims.height, "cmdh", childMaxDims.height, "mdh", maxDims.height);
		let newMaxHeight = minNonZero(cardDims.height, childMaxDims.height, maxDims.height);
//		console.log("nmw: ", newMaxWidth, "nmh: ", newMaxHeight);

		if (newMaxWidth != maxDims['width'] || newMaxHeight != maxDims['height'])
			setMaxDims({width: newMaxWidth, height: newMaxHeight});
	}

	const transition={duration: 1, ease: [0.65, 0, 0.35, 1]};

	const variants = {
		initial: dir => (dir == 0 ? {
			opacity: 0
		} : {
			x: dir > 0 ? "100%" : "-100%"
		}),
		target: {
			opacity: 1,
			x: "0%"
		},
		exit: dir => (dir == 0 ? {
			opacity: 0
		} : {
			x: dir > 0 ? "-100%" : "100%"
		}),
	}

//	console.log("md: ", maxDims);
//	console.log("cd: ", cardDims);

	return (
		<div className={[styles.parent, props.className].join(" ")} style={{minWidth: maxDims.width, minHeight: maxDims.height}} ref={cardRef}>
			<ChildMeasurer setMaxDimensions={setMaxDimsHandler} show={false}>
				{props.children}
			</ChildMeasurer>
			<AnimatePresence initial={false} custom={direction} style={{width: '100%', height: '100%'}}>
				{props.children.map((child, idx) => idx == selected && (
					<motion.div key={idx} style={{minWidth: maxDims.width, minHeight: maxDims.height, position: 'absolute'}}
						variants={variants} custom={direction} initial="initial" animate="target" exit="exit" transition={transition}
					>
						{child}
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
});

export default SlidingCard;

/*

*/
