import React, { useEffect, useRef } from "react";
import Offert from "./Offert";

import burger from "../../assets/images/burger.png";

import styles from "./Offerts.module.scss";
import CategorySign from "./CategorySign";
import {
	getOfferts,
	getSections,
	IApiOffert,
	ISection,
} from "../../assets/firebase/firestore";
import Section from "./Section";

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
		<div>
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
							offerts.find((offert) => offert.sectionId === section.id)?.data ||
							[]
						}
					/>
				))}
		</div>
	);
}

export default Offerts;
