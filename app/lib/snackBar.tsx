import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import styles from "./snackBar.module.css";

interface SnackBarProps extends React.ComponentPropsWithoutRef<"div"> {
	content: object;
}

const SnackBar = ({content, ...divProps}: SnackBarProps) => {
	const [ child, setChild ] = useState<React.HTMLElement>(content?.child);

	useEffect(() => {
		if (content && content.timeout > 0){
			setChild(content.child);
			setTimeout(() => setChild(null), content.timeout);
		}
	}, [content]);

	return (
		<AnimatePresence>
			{child && (
				<motion.div {...divProps} className={styles.snackBar} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
					{child}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default SnackBar;
