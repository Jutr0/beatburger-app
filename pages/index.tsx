import React from "react";
import { Container } from "react-grid-system";

import styles from "../styles/Home.module.scss";
import LandingScreen from "../components/LandingScreen";
import Menu from "../components/Menu";
import Offerts from "../components/Offerts";

function Home() {
	return (
		<>
			<LandingScreen />
			<Container
				fluid={true}
				xs
				sm
				md
				className={styles.container}
				component="main"
			>
				<Menu />
				<Offerts />
			</Container>
		</>
	);
}

export default Home;
