import React, { useState } from "react";
import { Row } from "react-grid-system";

import MenuOption from "./MenuOption";
import Heading from "../Heading";

import { OPTIONS } from "../../assets/utils/menuOpts";
import cheese from "../../assets/images/cheese.png";
import styles from "./Menu.module.scss";

function Menu() {
	const [pickedOption, setPickedOption] = useState<string>("burgery");

	return (
		<Row className={styles.container}>
			{/* <div
				className={styles.cheese}
				style={{ backgroundImage: `url('${cheese.src}')` }}
			/> */}
			<Heading underline>MENU</Heading>
			<div className={styles.menuOptionsContainer}>
				{OPTIONS.map((option) => (
					<MenuOption
						key={option.title}
						isActive={option.title.toLowerCase() === pickedOption.toLowerCase()}
						Icon={option.icon}
						onClick={() => {
							setPickedOption(option.title);
						}}
						title={option.title}
					/>
				))}
			</div>
		</Row>
	);
}

export default Menu;
