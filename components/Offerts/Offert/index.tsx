import React, { useState } from "react";
import { Hidden, Visible } from "react-grid-system";

import Button from "../../Button";
import AdditionalProduct from "./AdditionalProduct";
import Product, { IProduct } from "./Product";

import AddIcon from "./plus-svgrepo-com.svg";
import styles from "./Offert.module.scss";
import { IOffert } from "../../../assets/types/orders";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addToCart } from "../../../redux/slices/cartSlice";
import Price from "../../Price";

type IProps = IOffert & {
	additionalProduct?: {
		title: string;
	};
};

function Offert({
	name,
	thumbnail,
	products,
	price,
	additionalProduct,
}: IProps) {
	const cart = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	const [isProductsShown, setIsProductsShown] = useState(false);

	const toggleProducts = () => {
		setIsProductsShown((previousState) => !previousState);
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
							{products &&
								products.map(({ name, thumbnail, quantity }) => (
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
					<Price {...price} />
				</div>
				<Button
					Icon={AddIcon}
					iconProps={{ width: "13", height: "13" }}
					onClick={() => {
						dispatch(addToCart({ name, price }));
						console.log(cart);
					}}
				>
					Dodaj
				</Button>
				{/* <div className={styles.personalise}>Personalizuj zestaw</div> */}
			</div>
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
						{products &&
							products.map(({ name, thumbnail, quantity }) => (
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
		</section>
	);
}

export default Offert;
