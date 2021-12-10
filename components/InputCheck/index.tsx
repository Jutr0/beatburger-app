import React from "react";

import styles from "./InputCheck.module.scss";

type IProps = {
	value: string;
	isChecked: boolean;
	onClick: Function;
	className?: string;
	style?: Object;
};

function InputCheck({ style, value, isChecked, onClick, className }: IProps) {
	return (
		<div
			style={style}
			onClick={() => onClick()}
			className={`${styles.input} ${className}`}
		>
			<span className={`${styles.marker} ${isChecked && styles.active}`}></span>
			{value}
		</div>
	);
}

export default InputCheck;
