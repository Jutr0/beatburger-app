import React, { useState } from "react";
import { Hidden, Visible } from "react-grid-system";

import Button from "../../Button";
import AdditionalProduct from "./AdditionalProduct";
import Product, { IProduct } from "./Product";

import AddIcon from "./plus-svgrepo-com.svg";
import styles from "./Offert.module.scss";

type IProps = {
	title: string;
	thumbnail: string;
	products: IProduct[];
	price: {
		full: number;
		point: number;
	};
	additionalProduct?: {
		title: string;
	};
};

function Offert({
	title,
	thumbnail,
	products,
	price,
	additionalProduct,
}: IProps) {
	const [isProductsShown, setIsProductsShown] = useState(false);

	const toggleProducts = () => {
		setIsProductsShown((last) => !last);
	};

	return (
		<section className={styles.container}>
			<div className={styles.productDescription}>
				<Hidden sm xs>
					<h1>{title}</h1>
				</Hidden>
				<div className={styles.products}>
					<div
						className={styles.mainProduct}
						style={{ backgroundImage: `url('${thumbnail}')` }}
					></div>
					<Hidden sm xs>
						<div className={styles.productItems}>
							{products &&
								products.map(({ title, thumbnail, quantity }) => (
									<Product
										key={title}
										title={title}
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
						<h1>{title}</h1>
					</Visible>
					<div className={styles.price}>
						<div className={styles.full}>{price.full}</div>
						<div className={styles.point}>{price.point}</div>
					</div>
				</div>
				<Button Icon={AddIcon} iconProps={{ width: "13", height: "13" }}>
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
							products.map(({ title, thumbnail, quantity }) => (
								<Product
									key={title}
									title={title}
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
