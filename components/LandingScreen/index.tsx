import React from "react";
import { Row } from "react-grid-system";
import Image from "next/image";

import MainHeading from "../MainHeading";

import cheese from "../../assets/images/cheese.png";
import burger from "../../assets/images/burger.png";
import logo from "../../assets/images/logo_465x320.png";
import bg from "../../assets/images/table.jpg";
import styles from "./LandingScreen.module.scss";

function LandingScreen() {
	return (
		<>
			<div
				className={styles.background}
				style={{ backgroundImage: `url('${bg.src}')` }}
			>
				<div className={styles.logo}>
					<Image src={logo} alt="logo" layout="responsive" />
				</div>
				<MainHeading>Najlepszy burger w mieście</MainHeading>
				<div className={styles.burger}>
					<Image src={burger} layout="responsive" alt="Pyszny burger" />
				</div>
			</div>
			<div
				className={styles.cheese}
				style={{ backgroundImage: `url('${cheese.src}')` }}
			/>
		</>
	);
}

export default LandingScreen;
