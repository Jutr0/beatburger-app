import { Field, ErrorMessage } from "formik";
import React, { PropsWithChildren } from "react";
import { Col, Row } from "react-grid-system";

import styles from "./InputRadioBtn.module.scss";

type IProps = PropsWithChildren<{
	name: string;
	colSizes?: {
		xs?: number;
		sm?: number;
		md?: number;
		lg?: number;
		xl?: number;
		xxl?: number;
	};
	value: string;
	isChecked?: boolean;
}>;
function InputRadioBtn({ colSizes, name, value, children, isChecked }: IProps) {
	return (
		<Row gutterWidth={8} justify="center">
			<Col {...colSizes}>
				<label className={styles.input}>
					<Field
						className={styles.checked}
						type="radio"
						id={name}
						name={name}
						value={value}
					/>
					<span
						className={`${styles.marker} ${isChecked && styles.active}`}
					></span>

					{children}
				</label>
			</Col>
		</Row>
	);
}

export default InputRadioBtn;
