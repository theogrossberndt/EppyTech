"use client"

import { useState, FormEvent } from 'react';
import styles from "./page.module.css";
import Header from "/app/lib/header.tsx";

export default function ContactPage(){
	const [errors, setErrors] = useState(null);

	const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		console.log(formData);
	}

	const headerRefFunc = (element: HTMLDivElement): void => {
	}

	return (
		<div>
			<Header selectedPage={1} refFunc={headerRefFunc}/>
			<main className={styles.main}>
				<h1>Get A Free Consultation</h1>
				<br/>
				<p>Fill out the form to receive a free consultation and learn how we can help make your technology worry-free!</p>
				<form className={styles.form} onSubmit={onSubmit}>
					<div className={styles.inlineLabel}>
						<p>Name</p>
						(required)
					</div>
					<div className={styles.inlineForm}>
						<div className={styles.block}>
							<label for="fname">First Name</label>
							<input type="text" id="fname" name="fname" required/>
						</div>
						<div className={styles.sep}/>
						<div className={styles.block}>
							<label for="lname">Last Name</label>
							<input type="text" id="lname" name="lname" required/>
						</div>
					</div>
					<div className={styles.inlineLabel}>
						<p>Email</p>
						(required)
					</div>
					<div className={styles.block}>
						<label for="email">Please provide an email address where you can be reached.</label>
						<input type="email" id="email" name="email" required/>
					</div>
					<div className={styles.inlineLabel}>
						<p>Phone</p>
						(required)
					</div>
					<div className={styles.block}>
						<label for="phone">Please provide a phone number where you can best be reached.</label>
						<input type="tel" id="phone" name="phone" required/>
					</div>
					<div className={styles.inlineLabel}>
						<p>Message</p>
						(required)
					</div>
					<div className={styles.block}>
						<label for="message">Please provide a brief description of your concern or need.</label>
						<input type="text" id="message" name="message" required/>
					</div>

					<input type="submit" value="SUBMIT" className={styles.submitButton}/>
				</form>
			</main>
		</div>
	);
}
