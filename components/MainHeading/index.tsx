import React from "react";

import styles from "./MainHeading.module.scss";

type IProps = { children: string };

function MainHeading({ children }: IProps) {
	const text = children.split(" ");

	return (
		<h1 className={styles.mainHeading}>
			<div className={styles.bigger}>{text.shift()}</div>
			{text.shift()}
			<br />
			{text.join(" ")}
		</h1>
	);
}

export default MainHeading;
