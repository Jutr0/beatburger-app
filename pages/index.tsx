import React from "react";
import Image from "next/image";
import {
	Container,
	Row,
	Col,
	Visible,
	ScreenClassRender,
} from "react-grid-system";

import styles from "../styles/Home.module.scss";
import LandingScreen from "../components/LandingScreen";
import Menu from "../components/Menu";

function Home() {
	return (
		<Container
			fluid={true}
			xs
			sm
			md
			className={styles.container}
			component="main"
		>
			<LandingScreen />
			<Menu />
		</Container>
	);
}

export default Home;
