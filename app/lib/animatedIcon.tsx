import { AnimatePresence, motion } from 'framer-motion';

type AnimatedIconProps = {
	children?: React.ReactNode | Array<React.ReactNode>;
	style?: React.CSSProperties;
	selected: number
}

const AnimatedIcon = ({children, style, selected}: AnimatedIconProps) => {
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
		<div style={{position: 'relative', ...style}}>
			<AnimatePresence initial={false}>
				{selected == 0 ? (
					<motion.div animate={animate} initial={inOut1} exit={inOut1} key={0} style={{position: 'absolute'}}>
						{children[0]}
					</motion.div>
					) : (
					<motion.div animate={animate} initial={inOut2} exit={inOut2} key={1} style={{position: 'absolute'}}>
						{children[1]}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default AnimatedIcon;
