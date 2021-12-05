import React from "react";

import styles from "./CategorySign.module.scss";

type IProps = {
	title: string;
};

function CategorySign({ title }: IProps) {
	return <div className={styles.background}>{title}</div>;
}

export default CategorySign;
