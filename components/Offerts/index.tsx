import React, { useEffect, useRef } from "react";

import { IApiOffert, ISection } from "../../assets/firebase/firestore";
import Cart from "../Cart";
import Section from "./Section";

import styles from "./Offerts.module.scss";

type IProps = {
	sections: ISection[];
	offerts: { sectionId: string; data: IApiOffert[] }[];
};

function Offerts({ sections, offerts }: IProps) {
	const newOfferts = useRef<IApiOffert[]>([]);
	const bestsellerOfferts = useRef<IApiOffert[]>([]);

	useEffect(() => {
		newOfferts.current = [];
		bestsellerOfferts.current = [];

		offerts.forEach((offert) => {
			const temp = offert.data.forEach((step) => {
				if (!step.isNew) return;
				newOfferts.current.push(step);
			});
		});

		offerts.forEach((offert) => {
			const temp = offert.data.forEach((step) => {
				if (!step.isBestseller) return;
				bestsellerOfferts.current.push(step);
			});
		});
	}, [offerts]);

	return (
		<div className={styles.container}>
			<div className={styles.sectionContainer}>
				{newOfferts.current.length !== 0 && (
					<Section
						key="newOfferts"
						name="newOfferts"
						title="NOWOŚĆ!"
						id="newOfferts"
						offerts={newOfferts.current}
					/>
				)}
				{bestsellerOfferts.current.length !== 0 && (
					<Section
						key="bestsellerOfferts"
						name="bestsellerOfferts"
						title="Najczęściej zamawiane"
						id="bestsellerOfferts"
						offerts={bestsellerOfferts.current}
					/>
				)}
				{sections &&
					sections.map((section) => (
						<Section
							key={section.id}
							{...section}
							offerts={
								offerts.find((offert) => offert.sectionId === section.id)
									?.data || []
							}
						/>
					))}
			</div>
			<Cart />
		</div>
	);
}

export default Offerts;
