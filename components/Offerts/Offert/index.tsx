import React, { useState } from "react";
import { Hidden, Visible } from "react-grid-system";

import Button from "../../Button";
import AdditionalProduct from "./AdditionalProduct";
import Product from "./Product";
import { IOffert } from "../../../assets/types/orders";
import { useAppDispatch } from "../../../redux/hooks";
import Price from "../../Price";
import Modal from "../../Modal";
import PickProducts from "../PickProducts";
import { setType } from "../../../redux/slices/addonSlice";
import { addToCart } from "../../../redux/slices/cartSlice";

import AddIcon from "./plus-svgrepo-com.svg";
import styles from "./Offert.module.scss";

type IProps = IOffert & {
	additionalProduct?: {
		title: string;
	};
};

function Offert({
	name,
	thumbnail,
	ingredients,
	price,
	additionalProduct,
	type,
	mainType,
}: IProps) {
	const [isModalShown, setIsModalShown] = useState(false);
	const dispatch = useAppDispatch();

	const [isProductsShown, setIsProductsShown] = useState(false);

	const toggleProducts = () => {
		setIsProductsShown((previousState) => !previousState);
	};

	const onAddToCart = () => {
		dispatch(setType(type));
		if (type === "other" && mainType !== "burger") {
			dispatch(addToCart({ name, price, type, id: name, mainType }));
			return;
		}

		setIsModalShown(true);
	};
	return (
		<section className={styles.container}>
			<div className={styles.productDescription}>
				<Hidden sm xs>
					<h1>{name}</h1>
				</Hidden>
				<div className={styles.products}>
					<div
						className={styles.mainProduct}
						style={{ backgroundImage: `url('${thumbnail}')` }}
					></div>
					<Hidden sm xs>
						<div className={styles.productItems}>
							{ingredients &&
								ingredients.map(({ name, thumbnail, quantity }) => (
									<Product
										key={name}
										name={name}
										thumbnail={thumbnail}
										quantity={quantity}
									/>
								))}
							{additionalProduct && (
								<AdditionalProduct title={additionalProduct.title} />
							)}
						</div>
					</Hidden>
				</div>
			</div>
			<div className={styles.purchaseDescription}>
				<div className={styles.mobilePrice}>
					<Visible xs sm>
						<h1>{name}</h1>
					</Visible>
					<Price {...(Array.isArray(price) ? price[0] : price)} />
				</div>
				<Button
					style={{ marginBottom: 48 }}
					Icon={AddIcon}
					iconProps={{ width: "13", height: "13" }}
					onClick={onAddToCart}
				>
					Dodaj
				</Button>
			</div>
			{ingredients.length !== 0 && (
				<Visible sm xs>
					<div className={styles.ingridientsContainer}>
						<Button
							type="text"
							className={styles.showIngridientsButton}
							onClick={() => toggleProducts()}
						>
							Zobacz składniki
						</Button>
						<div
							className={`${styles.ingridients} ${
								isProductsShown && styles.active
							}`}
						>
							{ingredients.length !== 0 &&
								ingredients.map(({ name, thumbnail, quantity }) => (
									<Product
										key={name}
										name={name}
										thumbnail={thumbnail}
										quantity={quantity}
									/>
								))}
							{additionalProduct && (
								<AdditionalProduct title={additionalProduct.title} />
							)}
						</div>
					</div>
				</Visible>
			)}
			<Modal
				show={isModalShown}
				onClose={() => {
					setIsModalShown(false);
				}}
			>
				<PickProducts
					mainType={mainType}
					onClose={() => {
						setIsModalShown(false);
					}}
					name={name}
					price={price}
				/>
			</Modal>
		</section>
	);
}

export default Offert;
