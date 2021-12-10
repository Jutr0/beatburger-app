import React from "react";

import styles from "./QuantityIndicator.module.scss";

const QuantityIndicator = ({ quantity = 0 }: { quantity: number }) => {
	return quantity > 0 ? (
		<div className={styles.quantity}>{quantity}x</div>
	) : null;
};

export default QuantityIndicator;
