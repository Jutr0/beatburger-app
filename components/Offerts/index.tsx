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
				{[1, 3, 34].map((step) => (
					<Offert
						id={Date.now().toString()}
						type="burger"
						key={step}
						name="Bacon Burger"
						thumbnail={burger.src}
						products={[
							{
								thumbnail:
									"https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Poke/15_04/v2_poke_bowl_1_web.png",
								quantity: 1,
								name: "SWEET CHILLI POKÉ bowl",
							},
							{
								quantity: 1,
								name: "Ryż & chrupiące bites",
								thumbnail:
									"https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Poke/items/Bites_skladniki_ryz_web.png",
							},
							{
								quantity: 1,
								name: "bez napoju",
								thumbnail:
									"https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/bez_wyboru.png",
							},
						]}
						price={{ full: 26, point: 95 }}
					/>
				))}
				{[1, 3, 34].map((step) => (
					<Offert
						id={Date.now().toString() + 1}
						type="zestaw"
						key={step}
						name="Bacon Burger"
						thumbnail={burger.src}
						products={[
							{
								thumbnail:
									"https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Poke/15_04/v2_poke_bowl_1_web.png",
								quantity: 1,
								name: "SWEET CHILLI POKÉ bowl",
							},
							{
								quantity: 1,
								name: "Ryż & chrupiące bites",
								thumbnail:
									"https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Poke/items/Bites_skladniki_ryz_web.png",
							},
							{
								quantity: 1,
								name: "bez napoju",
								thumbnail:
									"https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/bez_wyboru.png",
							},
						]}
						price={{ full: 26, point: 95 }}
					/>
				))}
				{[1, 3, 34].map((step) => (
					<Offert
						id={Date.now().toString() + 2}
						type="other"
						key={step}
						name="Bacon Burger"
						thumbnail={burger.src}
						products={[
							{
								thumbnail:
									"https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Poke/15_04/v2_poke_bowl_1_web.png",
								quantity: 1,
								name: "SWEET CHILLI POKÉ bowl",
							},
							{
								quantity: 1,
								name: "Ryż & chrupiące bites",
								thumbnail:
									"https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Poke/items/Bites_skladniki_ryz_web.png",
							},
							{
								quantity: 1,
								name: "bez napoju",
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
