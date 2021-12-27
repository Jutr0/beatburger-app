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
	disabled?: boolean;
	htmlType?: "button" | "submit" | "reset";
	id?: string;
}>;

function Button({
	children,
	Icon,
	iconProps,
	onClick,
	style,
	className,
	type = "filled",
	disabled = false,
	htmlType,
	id,
}: IProps) {
	return (
		<button
			id={id || ""}
			type={htmlType || "button"}
			disabled={disabled}
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
