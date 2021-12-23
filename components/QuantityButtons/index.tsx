import React from "react";
import ChangeQuantityButton from "./ChangeQuantityButton";

import styles from "./QuantityButtons.module.scss";

type IProps = {
	className?: string;
	classNameIncrement?: string;
	classNameDecrement?: string;
	classNameButton?: string;
	onIncrement: Function;
	onDecrement: Function;
};

function QuantityButtons({
	className,
	classNameIncrement,
	classNameButton,
	onIncrement,
	onDecrement,
	classNameDecrement,
}: IProps) {
	return (
		<div className={`${styles.buttons} ${className && className}`}>
			<ChangeQuantityButton
				className={`${classNameDecrement && classNameDecrement} ${
					classNameButton && classNameButton
				}`}
				onClick={onDecrement}
			>
				-
			</ChangeQuantityButton>
			<ChangeQuantityButton
				className={`${classNameIncrement && classNameIncrement} ${
					classNameButton && classNameButton
				}`}
				onClick={onIncrement}
			>
				+
			</ChangeQuantityButton>
		</div>
	);
}

export default QuantityButtons;
