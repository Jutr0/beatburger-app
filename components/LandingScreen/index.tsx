import React from "react";
import Image from "next/image";

import MainHeading from "../MainHeading";

import styles from "./LandingScreen.module.scss";

function LandingScreen() {
	return (
		<>
			<div
				className={styles.background}
				style={{
					backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/beatburger-app.appspot.com/o/table.webp?alt=media&token=670bc586-eef5-4d69-909a-52314872f5a9')`,
				}}
			>
				<div className={styles.logo}>
					<Image
						src={
							"https://firebasestorage.googleapis.com/v0/b/beatburger-app.appspot.com/o/logo_465x320.webp?alt=media&token=b19e9c98-a4ed-430f-b163-deee381b937b"
						}
						alt="logo"
						layout="responsive"
						width="465"
						height="300"
					/>
				</div>
				<MainHeading className={styles.mainHeading}>
					Najlepszy burger w mieście
				</MainHeading>
				<div className={styles.burger}>
					<Image
						src={
							"https://firebasestorage.googleapis.com/v0/b/beatburger-app.appspot.com/o/burger.webp?alt=media&token=f83b8a13-ca46-4664-9440-66ed039df385"
						}
						layout="responsive"
						alt="Pyszny burger"
						width="465"
						height="465"
					/>
				</div>
			</div>
			<div
				className={styles.cheese}
				style={{
					backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/beatburger-app.appspot.com/o/cheese.webp?alt=media&token=c0f6d3d0-f26c-4372-ae85-0dccc9f63c86')`,
				}}
			/>
		</>
	);
}

export default LandingScreen;
