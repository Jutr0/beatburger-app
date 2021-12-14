import React, { useEffect } from "react";
import { Container } from "react-grid-system";
import { Provider } from "react-redux";

import LandingScreen from "../components/LandingScreen";
import Menu from "../components/Menu";
import Offerts from "../components/Offerts";
import { store } from "../redux/store";
import Cart from "../components/Cart";

import styles from "../styles/Home.module.scss";
import {
	getOfferts,
	getSections,
	IApiOffert,
	ISection,
} from "../assets/firebase/firestore";

type IProps = {
	sections: ISection[];
	offerts: { sectionId: string; data: IApiOffert[] }[];
};

function Home({ sections, offerts }: IProps) {
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
				<Offerts sections={sections} offerts={offerts} />
			</Container>
		</Provider>
	);
}

export default Home;

export const getStaticProps = async () => {
	const sections = await getSections().then((res) => res || []);

	const offerts = await Promise.all(
		sections.map(async (section) => {
			const data = await getOfferts(section.id).then((res) => res || []);
			return { data, sectionId: section.id } || [];
		})
	);

	return {
		revalidate: 1,
		props: { sections, offerts },
	};
};
