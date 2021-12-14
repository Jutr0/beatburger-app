import React, { useEffect, useState } from "react";
import {
	getOfferts,
	IApiOffert,
	IIngredient,
} from "../../../assets/firebase/firestore";
import CategorySign from "../CategorySign";
import Offert from "../Offert";

import styles from "./Section.module.scss";

type IProps = {
	name: string;
	title: string;
	id: string;
	offerts: IApiOffert[];
};

function Section({ id, name, title, offerts }: IProps) {
	return (
		<div className={styles.category}>
			<CategorySign title={title} />
			{offerts.map((step) => (
				<Offert
					id={id}
					type={step.type}
					mainType={step.mainType}
					key={step.id}
					name={step.name}
					thumbnail={step.thumbnail}
					ingredients={
						step.ingredients as (IIngredient & { quantity: number })[]
					}
					price={step.price}
				/>
			))}
		</div>
	);
}

export default Section;
