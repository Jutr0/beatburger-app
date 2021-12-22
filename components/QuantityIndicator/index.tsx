import React from "react";

import styles from "./QuantityIndicator.module.scss";

type IProps = { quantity: number; minValue?: number };

const QuantityIndicator = ({ quantity = 0, minValue = 0 }: IProps) => {
	return quantity > minValue ? (
		<div className={styles.quantity}>{quantity}x</div>
	) : null;
};

export default QuantityIndicator;
