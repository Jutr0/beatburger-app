import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../Backdrop";

import styles from "./Modal.module.scss";

type IProps = React.PropsWithChildren<{
	show: boolean;
	onClose?: Function;
	closeOnBackdropClick?: boolean;
}>;

function Modal({
	show,
	onClose,
	children,
	closeOnBackdropClick = true,
}: IProps) {
	const [isBrowser, setIsBrowser] = useState(false);
	const body = isBrowser ? document.body : undefined;

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	useEffect(() => {
		if (show) {
			body?.classList.add("modal-open");
		} else body?.classList.remove("modal-open");
	}, [show]);

	return isBrowser && show
		? createPortal(
				<>
					<Backdrop
						onClose={onClose}
						closeOnBackdropClick={closeOnBackdropClick}
						show={show}
					/>
					<div className={styles.modal}>{children}</div>
				</>,
				document.getElementById("modal-root") as Element
		  )
		: null;
}

export default Modal;
