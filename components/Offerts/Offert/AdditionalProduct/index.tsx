import React from "react";
import AddIcon from "../plus-svgrepo-com.svg";

import styles from "./AdditionalProduct.module.scss";

type IProps = {
	title: string;
	onClick?: (...x: any) => void;
};

function AdditionalProduct({ title, onClick }: IProps) {
	return (
		<div className={styles.additionalProduct}>
			<div className={styles.iconContainer}>
				<AddIcon width="13" height="13" fill="#fff" />
			</div>
			<span>{title}</span>
		</div>
	);
}

export default AdditionalProduct;
