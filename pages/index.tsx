import React, { useEffect } from "react";
import { Container } from "react-grid-system";

import LandingScreen from "../components/LandingScreen";
import Menu from "../components/Menu";
import Offerts from "../components/Offerts";
import Cart from "../components/Cart";

import styles from "../styles/Home.module.scss";
import {
	getIngredients,
	getOfferts,
	getSections,
	IApiOffert,
	IIngredient,
	ISection,
} from "../assets/firebase/firestore";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setIngredients } from "../redux/slices/ingredientsSlice";
import { GetServerSideProps } from "next";
import { setDrinksSection } from "../redux/slices/drinksSlice";

type IProps = {
	sections: ISection[];
	offerts: { sectionId: string; data: IApiOffert[] }[];
	ingredients: IIngredient[];
};

function Home({ sections, offerts, ingredients }: IProps) {
	const dispatch = useAppDispatch();
	const ingredientsRedux = useAppSelector((state) => state.ingredients);
	const drinks = useAppSelector((state) => state.drinks);

	useEffect(() => {
		if (ingredientsRedux.length !== 0) return;
		dispatch(setIngredients(ingredients));
	}, [ingredients, ingredientsRedux.length]);

	useEffect(() => {
		if (drinks.length !== 0) return;
		const temp = offerts.find(
			(step) =>
				step.sectionId ===
				sections.find((section) => section.name === "drinks")?.id
		);
		dispatch(setDrinksSection(temp!.data));
	}, [offerts, drinks.length]);

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
				<Offerts sections={sections} offerts={offerts} />
			</Container>
		</>
	);
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const sections = (await getSections()) || [];
	const ingredients = (await getIngredients()) || [];

	const offerts = await Promise.all(
		sections.map(async (section) => {
			const data = await getOfferts(section.id).then((res) => res || []);
			return { data, sectionId: section.id } || [];
		})
	);

	return {
		props: { sections, offerts, ingredients },
	};
};
