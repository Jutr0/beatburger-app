import React from "react";
import Backdrop from "../Backdrop";

import styles from "./Modal.module.scss";

type IProps = React.PropsWithChildren<{
	show: boolean;
	onClose?: Function;
}>;

function Modal({ show, onClose, children }: IProps) {
	return (
		<Backdrop show={show}>
			<div className={styles.modal}>{children}</div>
		</Backdrop>
	);
}

export default Modal;
