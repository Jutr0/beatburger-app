import React from "react";

import styles from "./Heading.module.scss";

type IProps = React.PropsWithChildren<{
	fontSize?: number;
	color?: string;
	underline?: boolean;
}>;

function Heading({ children, fontSize, color, underline }: IProps) {
	return (
		<h1
			className={`${styles.heading} ${underline && styles.underline}`}
			style={{ color, fontSize }}
		>
			{children}
		</h1>
	);
}

export default Heading;
