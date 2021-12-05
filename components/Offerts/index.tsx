import React from "react";
import Offert from "./Offert";

import burger from "../../assets/images/burger.png";

import styles from "./Offerts.module.scss";
import CategorySign from "./CategorySign";

function Offerts() {
	return (
		<div>
			<div className={styles.category}>
				<CategorySign title="Najczęściej zamawiane" />
				{[1, 3, 34, 54, 545, 4545].map(() => (
					<Offert
						key="1"
						title="Bacon Burger"
						thumbnail={burger.src}
						products={[]}
						price={{ full: 26, point: 95 }}
					/>
				))}
			</div>
		</div>
	);
}

export default Offerts;
