import React from "react";

import styles from "./Button.module.scss";

type IProps = React.PropsWithChildren<{
	type?: "filled" | "outlined" | "text";
	Icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
	onClick?: (...x: any) => void;
	iconProps?: {
		width?: string;
		height?: string;
		fill?: string;
		vieWBox?: string;
	};
	style?: Object;
	className?: string;
}>;

function Button({
	children,
	Icon,
	iconProps,
	onClick,
	style,
	className,
	type = "filled",
}: IProps) {
	return (
		<button
			onClick={(_) => onClick && onClick()}
			className={`${styles.button} ${className} ${styles[type]}`}
			style={style}
		>
			{Icon && <Icon {...iconProps} />}
			{children}
		</button>
	);
}

export default Button;
