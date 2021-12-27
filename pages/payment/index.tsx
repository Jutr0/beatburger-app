import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-grid-system";
import Button from "../../components/Button";
import YourOrder from "../../components/Cart/YourOrder";
import MyForm from "../../components/MyForm";
import { useAppSelector } from "../../redux/hooks";
import Image from "next/image";

import styles from "../../styles/Payments.module.scss";

function Payment() {
	const orders = useAppSelector((state) => state.cart.orders);
	const router = useRouter();
	useEffect(() => {
		if (orders.length > 0) return;
		router.replace("/");
	}, [orders.length]);
	return (
		<main className={styles.containersContainer}>
			<Container
				fluid={true}
				xs
				sm
				component="section"
				style={{ paddingTop: 64 }}
			>
				<Row gutterWidth={8} justify="center">
					<Col xs={11} sm={10} md={12} xl={8} xxl={8}>
						<div className={styles.orderContainer}>
							<Image
								src={
									"https://firebasestorage.googleapis.com/v0/b/beatburger-app.appspot.com/o/logo_465x320.webp?alt=media&token=b19e9c98-a4ed-430f-b163-deee381b937b"
								}
								alt="logo"
								layout="intrinsic"
								width="465"
								height="300"
							/>
							<YourOrder />
							<Button
								htmlType="submit"
								className={styles.submitBtn}
								onClick={() => {
									const button: HTMLButtonElement | null =
										window &&
										document &&
										(document.getElementById(
											"purchaseSubmitBtn"
										) as HTMLButtonElement);

									button && button.click();
								}}
							>
								Zamawiam i płacę
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
			<Container
				fluid={true}
				xs
				sm
				md
				component="section"
				style={{ paddingTop: 64 }}
			>
				{/* <Row gutterWidth={8} justify="center">
					<Col xs={10} sm={8} md={5} xl={4} xxl={3}>
						<div className={styles.orderContainer}>
							<YourOrder />
							<Button htmlType="submit" className={styles.submitBtn}>
								Zamawiam i płacę
							</Button>
						</div>
					</Col>
				</Row> */}
				<MyForm />
			</Container>
		</main>
	);
}

export default Payment;
