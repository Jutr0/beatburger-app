import React from "react";
import { Row } from "react-grid-system";

import MenuOption from "./MenuOption";
import Heading from "../Heading";

import { OPTIONS } from "../../assets/utils/menuOpts";
import Cheese from "../../assets/images/cheese.svg";
import styles from "./Menu.module.scss";

function Menu() {
	return (
		<Row className={styles.container}>
			<Cheese viewBox="100 0 1100  300" className={styles.cheese} />
			<Heading underline>MENU</Heading>
			<div className={styles.menuOptionsContainer}>
				{OPTIONS.map((option, index) => (
					<MenuOption
						key={option.title}
						isActive={!index}
						Icon={option.icon}
						onClick={() => {}}
						title={option.title}
					/>
				))}
			</div>
		</Row>
	);
}

export default Menu;
