import { Form, Formik } from "formik";
import React from "react";
import { Container, Row } from "react-grid-system";
import InputText from "./InputText";
import * as Yup from "yup";

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
};
const onSubmit = (values: typeof initialValues) => {
	console.log(values);
};

const validationSchema = Yup.object({
	address: Yup.object({
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
	}),
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
				return (
					<Form>
						<Container component={"section"}>
							<Row gutterWidth={8} justify="center">
								<h1 className={styles.title}>address</h1>
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
						<Container component={"section"}>
							<Row gutterWidth={8} justify="center">
								<h1 className={styles.title}>contact</h1>
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
							<button type="submit">Submit</button>
						</Container>
					</Form>
				);
			}}
		</Formik>
	);
}

export default MyForm;
