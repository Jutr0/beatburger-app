import React from "react";
import { Visible } from "react-grid-system";

import styles from "./MainHeading.module.scss";

type IProps = { children: string; className?: string };

function MainHeading({ children, className }: IProps) {
	const text = children.split(" ");

	return (
		<h1 className={`${styles.mainHeading} ${className && className}`}>
			<div className={`${styles.bigger}`}>{text.shift()}</div>
			{text.shift() + " "}
			<Visible sm xs>
				<br />
			</Visible>
			{text.join(" ")}
		</h1>
	);
}

export default MainHeading;
