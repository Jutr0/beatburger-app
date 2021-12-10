import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./Backdrop.module.scss";

type IProps = React.PropsWithChildren<{
	show: boolean;
	onClose?: Function;
}>;

function Backdrop({ show, onClose, children }: IProps) {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	return isBrowser && show
		? createPortal(
				<div className={styles.backdrop}>{children}</div>,
				document.getElementById("modal-root") as Element
		  )
		: null;
}

export default Backdrop;
