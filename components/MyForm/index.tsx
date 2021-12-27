import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-grid-system";
import InputText from "./InputText";
import * as Yup from "yup";
import InputRadioBtn from "./InputRadioBtn";
import Button from "../Button";

import styles from "./MyForm.module.scss";

const initialValues = {
	address: {
		street: "",
		number: "",
		city: "",
		local: "",
		floor: "",
		company: "",
	},
	contact: {
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
	},
	purchaseType: "online",
	deliveryType: "delivery",
};
const onSubmit = (values: typeof initialValues) => {
	console.log(values);
};

const validationSchema = Yup.object().shape({
	purchaseType: Yup.string(),
	deliveryType: Yup.string().required("Sposób dostawy jest wymagany"),
	address: Yup.object(),
	//Yup.object().shape({
	// 	street: Yup.string().required("Podaj nazwę ulicy"),
	// 	number: Yup.string().required("Podaj numer budynku"),
	// 	city: Yup.string().required("Podaj nazwę miasta"),
	// 	local: Yup.string(),
	// 	floor: Yup.number()
	// 		.integer("Nieprawidłowe piętro")
	// 		.typeError("Nieprawidłowe piętro")
	// 		.test(
	// 			"is-non-negative",
	// 			"Nieprawidłowe piętro",
	// 			(value) => !value || (!!value && value >= 0)
	// 		),
	// 	company: Yup.string(),
	// }),
	contact: Yup.object({
		firstName: Yup.string().required("Podaj imię"),
		lastName: Yup.string().required("Podaj nazwisko"),
		phone: Yup.number()
			.required("Podaj numer telefonu")
			.typeError("Nieprawidłowy numer telefonu")
			.test(
				"is-9-digtit",
				"Numer powinien być 9-cio cyforwy",
				(value) => value?.toString().length === 9
			),
		email: Yup.string().email("Podaj prawidłowy email").required("Podaj email"),
	}),
});

function MyForm() {
	return (
		<Formik
			onSubmit={onSubmit}
			initialValues={initialValues}
			validationSchema={validationSchema}
		>
			{(props) => {
				if (props.values.deliveryType === "delivery") {
					validationSchema.fields.address = Yup.object().shape({
						street: Yup.string().required("Podaj nazwę ulicy"),
						number: Yup.string().required("Podaj numer budynku"),
						city: Yup.string().required("Podaj nazwę miasta"),
						local: Yup.string(),
						floor: Yup.number()
							.integer("Nieprawidłowe piętro")
							.typeError("Nieprawidłowe piętro")
							.test(
								"is-non-negative",
								"Nieprawidłowe piętro",
								(value) => !value || (!!value && value >= 0)
							),
						company: Yup.string(),
					});
				} else {
					validationSchema.fields.address = Yup.object();
				}

				return (
					<Form id="paymentForm">
						<Container component={"section"}>
							<Row gutterWidth={8} justify="center">
								<h1 className={styles.title}>płatność</h1>
							</Row>
							<InputRadioBtn
								name="purchaseType"
								value="online"
								colSizes={{
									xs: 12,
									sm: 12,
									md: 10,
									xl: 10,
									xxl: 10,
								}}
								isChecked={props.values.purchaseType === "online"}
							>
								Płatność online
							</InputRadioBtn>
							<InputRadioBtn
								name="purchaseType"
								value="card"
								colSizes={{
									xs: 12,
									sm: 12,
									md: 10,
									xl: 10,
									xxl: 10,
								}}
								isChecked={props.values.purchaseType === "card"}
							>
								Karta (przy odbiorze)
							</InputRadioBtn>
							<InputRadioBtn
								name="purchaseType"
								value="cash"
								colSizes={{
									xs: 12,
									sm: 12,
									md: 10,
									xl: 10,
									xxl: 10,
								}}
								isChecked={props.values.purchaseType === "cash"}
							>
								Gotówka
							</InputRadioBtn>
						</Container>
						<Container component={"section"}>
							<Row gutterWidth={8} justify="center">
								<h1 className={styles.title}>sposób dostarczenia</h1>
							</Row>
							<InputRadioBtn
								name="deliveryType"
								value="delivery"
								colSizes={{
									xs: 12,
									sm: 12,
									md: 10,
									xl: 10,
									xxl: 10,
								}}
								isChecked={props.values.deliveryType === "delivery"}
							>
								Dostawa
							</InputRadioBtn>
							<InputRadioBtn
								name="deliveryType"
								value="pickup"
								colSizes={{
									xs: 12,
									sm: 12,
									md: 10,
									xl: 10,
									xxl: 10,
								}}
								isChecked={props.values.deliveryType === "pickup"}
							>
								Odbiór osobisty
							</InputRadioBtn>
							<InputRadioBtn
								name="deliveryType"
								value="inRestaurant"
								colSizes={{
									xs: 12,
									sm: 12,
									md: 10,
									xl: 10,
									xxl: 10,
								}}
								isChecked={props.values.deliveryType === "inRestaurant"}
							>
								Zjem na miejscu
							</InputRadioBtn>
						</Container>
						{props.values.deliveryType === "delivery" && (
							<Container component={"section"}>
								<Row gutterWidth={8} justify="center">
									<h1 className={styles.title}>adres</h1>
								</Row>
								<Row gutterWidth={8} justify="center">
									<InputText
										name="address.street"
										type="text"
										title="Ulica"
										colSizes={{ xs: 8, sm: 8, md: 7, xl: 7, xxl: 7 }}
										required
									/>
									<InputText
										name="address.number"
										type="text"
										title="Numer"
										colSizes={{ xs: 4, sm: 4, md: 3, xl: 3, xxl: 3 }}
										required
									/>
								</Row>
								<Row gutterWidth={8} justify="center">
									<InputText
										name="address.city"
										type="text"
										title="Miasto"
										colSizes={{
											xs: 12,
											sm: 12,
											md: 10,
											xl: 10,
											xxl: 10,
										}}
										required
									/>
								</Row>
								<Row gutterWidth={8} justify="center">
									<InputText
										name="address.local"
										type="text"
										title="Lokal"
										colSizes={{ xs: 6, sm: 6, md: 5, xl: 5, xxl: 5 }}
									/>
									<InputText
										name="address.floor"
										type="text"
										title="Piętro"
										colSizes={{ xs: 6, sm: 6, md: 5, xl: 5, xxl: 5 }}
									/>
								</Row>
								<Row gutterWidth={8} justify="center">
									<InputText
										name="address.company"
										type="text"
										title="Firma"
										colSizes={{
											xs: 12,
											sm: 12,
											md: 10,
											xl: 10,
											xxl: 10,
										}}
									/>
								</Row>
							</Container>
						)}
						<Container component={"section"}>
							<Row gutterWidth={8} justify="center">
								<h1 className={styles.title}>kontakt</h1>
							</Row>
							<Row gutterWidth={8} justify="center">
								<InputText
									name="contact.firstName"
									type="text"
									title="Imię"
									colSizes={{
										xs: 12,
										sm: 12,
										md: 10,
										xl: 10,
										xxl: 10,
									}}
									required
								/>
							</Row>
							<Row gutterWidth={8} justify="center">
								<InputText
									name="contact.lastName"
									type="text"
									title="Nazwisko"
									colSizes={{
										xs: 12,
										sm: 12,
										md: 10,
										xl: 10,
										xxl: 10,
									}}
									required
								/>
							</Row>
							<Row gutterWidth={8} justify="center">
								<InputText
									name="contact.phone"
									type="tel"
									title="Telefon"
									colSizes={{
										xs: 12,
										sm: 12,
										md: 10,
										xl: 10,
										xxl: 10,
									}}
									required
								/>
							</Row>
							<Row gutterWidth={8} justify="center">
								<InputText
									name="contact.email"
									type="email"
									title="E-mail"
									colSizes={{
										xs: 12,
										sm: 12,
										md: 10,
										xl: 10,
										xxl: 10,
									}}
									required
								/>
							</Row>
							<Row gutterWidth={8} justify="end">
								<Col xs={12} sm={12} md={8} xl={6} xxl={6}>
									<Button
										id="purchaseSubmitBtn"
										htmlType="submit"
										className={styles.submitBtn}
									>
										Zamawiam i płacę
									</Button>
								</Col>
							</Row>
						</Container>
					</Form>
				);
			}}
		</Formik>
	);
}

export default MyForm;
