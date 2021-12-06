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
						products={[
							{
								thumbnail:
									"https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Poke/15_04/v2_poke_bowl_1_web.png",
								quantity: 1,
								title: "SWEET CHILLI POKÉ bowl",
							},
							{
								quantity: 1,
								title: "Ryż & chrupiące bites",
								thumbnail:
									"https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Poke/items/Bites_skladniki_ryz_web.png",
							},
							{
								quantity: 1,
								title: "bez napoju",
								thumbnail:
									"https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/bez_wyboru.png",
							},
						]}
						price={{ full: 26, point: 95 }}
					/>
				))}
			</div>
		</div>
	);
}

export default Offerts;
// products={[
// 	{
// 		thumbnail:
// 			'https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Poke/15_04/v2_poke_bowl_1_web.png',
// 		quantity: 1,
// 		title: 'SWEET CHILLI POKÉ bowl',
// 	},
// 	{
// 		quantity: 1,
// 		title: 'Ryż & chrupiące bites',
// 		thumbnail:
// 			'https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Poke/items/Bites_skladniki_ryz_web.png',
// 	},
// 	{
// 		quantity: 1,
// 		title: 'bez napoju',
// 		thumbnail:
// 			'https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/bez_wyboru.png',
// 	},
// ]}
