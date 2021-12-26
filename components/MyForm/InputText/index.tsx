import { ErrorMessage, Field } from "formik";
import React from "react";
import { Col } from "react-grid-system";

import styles from "./InputText.module.scss";

type IProps = {
	name: string;
	title: string;
	type: string;
	colSizes?: {
		xs?: number;
		sm?: number;
		md?: number;
		lg?: number;
		xl?: number;
		xxl?: number;
	};
	required?: boolean;
};

function InputText({ name, title, type, colSizes, required = false }: IProps) {
	return (
		<Col {...colSizes}>
			<label htmlFor={name} className={styles.label}>
				{title}
				{required && " *"}
			</label>
			<Field type={type} id={name} name={name} className={styles.input} />
			<ErrorMessage name={name}>
				{(errMsg) => {
					return <div className={styles.error}>{errMsg}</div>;
				}}
			</ErrorMessage>
		</Col>
	);
}

export default InputText;
