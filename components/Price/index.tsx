import React from "react";
import { IPrice } from "../../assets/types/orders";

import styles from "./Price.module.scss";

type IProps = IPrice & {
	className?: string;
	style?: Object;
};

function Price({ full, point, className, style }: IProps) {
	return (
		<div className={`${styles.price} ${className}`} style={style}>
			<div className={styles.full}>{full}</div>
			{point > 0 && <div className={styles.point}>{point}</div>}
			<span className={styles.currency}>zł</span>
		</div>
	);
}

export default Price;
