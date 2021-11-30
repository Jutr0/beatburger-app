import React from "react";

import styles from "./MenuOption.module.scss";

type IProps = {
	Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
	title: string;
	isActive: boolean;
	onClick: Function;
};

function MenuOption({ Icon, title, isActive, onClick }: IProps) {
	return (
		<div className={styles.menuOption} onClick={() => onClick()}>
			<Icon
				color="blue"
				className={`${styles.icon} ${isActive && styles.active}`}
			/>
			<span className={`${styles.title} ${isActive && styles.active}`}>
				{title}
			</span>
		</div>
	);
}

export default MenuOption;
