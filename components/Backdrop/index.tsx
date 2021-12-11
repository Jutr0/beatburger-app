import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./Backdrop.module.scss";

type IProps = React.PropsWithChildren<{
	show: boolean;
	onClose?: Function;
	closeOnBackdropClick?: boolean;
}>;

function Backdrop({ show, onClose, children, closeOnBackdropClick }: IProps) {
	// const [isBrowser, setIsBrowser] = useState(false);

	// useEffect(() => {
	// 	setIsBrowser(true);
	// }, []);

	return show ? (
		<div
			onClick={() => {
				closeOnBackdropClick && onClose && onClose();
			}}
			className={styles.backdrop}
		>
			{children}
		</div>
	) : null;
}

export default Backdrop;
