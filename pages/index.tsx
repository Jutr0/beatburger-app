import React from "react";
import { Container } from "react-grid-system";
import { Provider } from "react-redux";

import LandingScreen from "../components/LandingScreen";
import Menu from "../components/Menu";
import Offerts from "../components/Offerts";
import { store } from "../redux/store";
import Cart from "../components/Cart";
import Modal from "../components/Modal";

import styles from "../styles/Home.module.scss";

function Home() {
	return (
		<Provider store={store}>
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
				<Cart />
				<Offerts />
			</Container>
		</Provider>
	);
}

export default Home;
