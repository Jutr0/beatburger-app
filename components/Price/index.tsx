import React from "react";
import { IPrice } from "../../assets/types/orders";

import styles from "./Price.module.scss";

type IProps = IPrice & {
	className?: string;
	style?: Object;
	fullStyle?: string;
	pointStyle?: string;
	currencyStyle?: string;
};

function Price({
	full,
	point,
	className,
	style,
	fullStyle,
	pointStyle,
	currencyStyle,
}: IProps) {
	return (
		<div className={`${styles.price} ${className || ""}`} style={style}>
			<div className={`${styles.full} ${fullStyle || ""}`}>{full}</div>

			<div className={`${styles.point} ${pointStyle || ""}`}>
				{point < 10 && "0"}
				{point}
			</div>

			<span className={`${styles.currency} ${currencyStyle || ""}`}>zł</span>
		</div>
	);
}

export default Price;
