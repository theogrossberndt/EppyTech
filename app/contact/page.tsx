"use client"

import { useRef, useState, FormEvent } from 'react';
import styles from "./page.module.css";
import Header from "/app/lib/header.tsx";
import SlidingCard from "/app/lib/slidingCard.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion';
import ChildMeasurer from "/app/lib/childMeasurer.tsx";
import IconButton from "/app/lib/iconButton.tsx";
import emailjs from '@emailjs/browser';
import ExportedImage from "next-image-export-optimizer";
import logoImageStatic from "/public/images/logoCropped.jpg";

export default function ContactPage(){
	const formRef = useRef(null);
	const cardRef = useRef(null);
	const [defaultWidth, setDefaultWidth] = useState<number>(0);
	const [errors, setErrors] = useState({});
	// 0: fillable, 1: loading (sending email), 2: submitted
	const [formState, setFormState] = useState<number>(0);
	const nameToReadable = {fname: "first name", lname: "last name", email: "email", phone: "phone number", message: "message"};


	const onSubmit = async (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		if (formState != 0)
			return;
		const formData = new FormData(event.currentTarget);
		let newErrors = {}
//		formData.forEach((val, key) => {
//			if (val.trim().length == 0){
//				if (!newErrors[key])
//					newErrors[key] = [];
//				newErrors[key].push("The " + nameToReadable[key] + " field is required.");
//			}
//		});
		setErrors(newErrors);
		if (Object.keys(newErrors).length == 0 && formRef.current){
			console.log("Sending email");
			setFormState(1);
			wait()
//			emailjs.sendForm("service_6omc8df","template_2e6g0zv", formRef.current, {publicKey: "lDCeJnFwBEYnQGVHD"})
				.then(
					() => {
						console.log("success");
						if (cardRef.current){
							setFormState(2);
							cardRef.current.goForward("success");
						} else
							setFormState(0);
					},
					(error) => {
						console.log(error);
						setErrors({form: ["The form could not be submitted. Please email admin@eppytech.com manually and mention this error.", error]});
						setFormState(0);
					});
		}
	}

	const wait = () => {
		return new Promise((resolve, reject) => setTimeout(() => {
			resolve('done');
		}, 2000));
	}

	const headerRefFunc = (element: HTMLDivElement): void => {
	}

	const formField = (label: string, type: string, key: string): HTMLDivElement => {
		return (
			<div className={[styles.block, errors[key] ? styles.error : ""].join(" ")}>
				<label htmlFor={key}>{label}</label>
				<input type={type} id={key} name={key} onInput={() => {
					if (errors[key])
						setErrors(oldErrors => Object.keys(oldErrors).filter(ek => ek != key).reduce((res, ek) => (res[ek] = oldErrors[ek], res), {}))
				}}/>
				<AnimatePresence>
					{errors[key] && errors[key].map((err, idx) => (
						<motion.div key={idx} animate={{height: 'auto'}} initial={{height: 0}} exit={{height: 0}} style={{overflow: 'hidden'}}>
							<div className={styles.errorMsg}>
								<FontAwesomeIcon icon={faCircleExclamation} style={{width: '1rem', height: '1rem', paddingRight: '0.5rem'}}/>
								{err}
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</div>
		);
	}

	console.log(defaultWidth);
	if (formRef.current)
		console.log(formRef.current.offsetWidth);

	const genForm = () => (
		<form className={styles.form} onSubmit={onSubmit} ref={formRef}>
			<fieldset disabled={formState != 0}>
				<AnimatePresence>
					{errors['form'] && errors['form'].map((err, idx) => (
						<motion.div key={idx} animate={{height: 'auto'}} initial={{height: 0}} exit={{height: 0}} style={{overflow: 'hidden'}}>
							<div className={styles.errorMsg}>
								<FontAwesomeIcon icon={faCircleExclamation} style={{width: '1rem', height: '1rem', paddingRight: '0.5rem'}}/>
								{err}
							</div>
						</motion.div>
					))}
				</AnimatePresence>
				<div className={styles.inlineLabel}>
					<p>Name</p>
					(required)
				</div>
				<div className={styles.inlineForm}>
					{formField("First Name", "text", "fname")}
					{formField("Last Name", "text", "lname")}
				</div>
				<div className={styles.inlineLabel}>
					<p>Email</p>
					(required)
				</div>
				{formField("Please provide an email address where you can be reached.", "email", "email")}
				<div className={styles.inlineLabel}>
					<p>Phone</p>
					(required)
				</div>
				{formField("Please provide a phone number where you can be reached.", "tel", "phone")}
				<div className={styles.inlineLabel}>
					<p>Message</p>
					(required)
				</div>
				{formField("Please provide a brief description of your concern or need.", "text", "message")}
				<motion.input animate={defaultWidth > 0 ? {width: formState == 0 ? defaultWidth : 2*defaultWidth} : {}}
					type="submit" value={formState == 0 ? "SUBMIT" : "SUBMITTING"} className={styles.button}
					ref={el => {
						if (el)
							setDefaultWidth(el.offsetWidth);
					}}/>
			</fieldset>
		</form>
	);

	const goBack = () => {
		setFormState(0);
		cardRef.current.goBackward("form");
	}

	return (
		<div>
			<Header selectedPage={1} refFunc={headerRefFunc}/>
			<main className={styles.main} id="main">
				<h1>Get A Free Consultation</h1>
				<br/>
				<p>Fill out the form to receive a free consultation and learn how we can help make your technology worry-free!</p>
				<SlidingCard ref={cardRef} className={styles.formCard}>
					<div id="form" style={{padding: '0.5rem 1rem'}}>
						{genForm()}
					</div>
					<div id="success" style={{padding: '0.5rem'}}>
						<IconButton onClick={goBack}>
							<FontAwesomeIcon icon={faChevronLeft} style={{width: '1rem', height: '1rem'}}/>
						</IconButton>
						<div>
							<div className={styles.overlayDiv} style={{filter: 'blur(16px)', opacity: 0.5}}>
								<ExportedImage
									src={logoImageStatic}
									alt="Eppy Tech Building"
									width={400}
									height={400}
									priority
								/>
							</div>
							<div className={styles.overlayDiv}>
								<h3>
								Thank you!  Your information has been submitted. A member of our team will be in touch.
								</h3>
								<button className={styles.button} onClick={goBack} style={{marginTop: '1rem'}}>Submit Another Form</button>
							</div>
						</div>
					</div>
				</SlidingCard>
			</main>
		</div>
	);
}
