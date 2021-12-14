import React from "react";
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
	return (
		<div>
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
