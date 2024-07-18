import { AnimatePresence, motion } from 'framer-motion';

interface AnimatedIconProps extends React.ComponentPropsWithoutRef<"div"> {
	selected: number;
}

const AnimatedIcon = ({selected, ...divProps}: AnimatedIconProps) => {
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

	return (
		<div {...divProps} style={{...divProps.style, position: 'relative'}}>
			<AnimatePresence initial={false}>
				{selected == 0 ? (
					<motion.div animate={animate} initial={inOut1} exit={inOut1} key={0} style={{position: 'absolute'}}>
						{divProps.children[0] ?? <div/>}
					</motion.div>
					) : (
					<motion.div animate={animate} initial={inOut2} exit={inOut2} key={1} style={{position: 'absolute'}}>
						{divProps.children[1] ?? <div/>}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default AnimatedIcon;
