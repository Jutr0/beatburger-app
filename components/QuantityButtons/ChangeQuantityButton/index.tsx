import React from "react";

import styles from "./ChangeQuantityButton.module.scss";

type IProps = React.PropsWithChildren<{
	onClick: Function;
	className?: string;
}>;
function ChangeQuantityButton({ onClick, className, children }: IProps) {
	return (
		<button
			className={`${styles.button} ${className && className}`}
			onClick={() => onClick()}
		>
			{children}
		</button>
	);
}

export default ChangeQuantityButton;
