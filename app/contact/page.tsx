"use client"

import Link from 'next/link';
import { useContext, useEffect, useRef, useState, FormEvent, ReactElement } from 'react';
import styles from "./page.module.css";
import Header from "@/app/lib/header.tsx";
import Footer from "@/app/lib/footer.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion';
import RoundedButton from "@/app/lib/roundedButton.tsx";
import emailjs from '@emailjs/browser';
import ExportedImage from "next-image-export-optimizer";
import logoImageStatic from "/public/images/logoCropped.jpg";
import ReCAPTCHA from 'react-google-recaptcha';

import {ContextProvider} from "@/app/appProvider.tsx";

export default function ContactPage(){
	const formRef = useRef<HTMLFormElement>(null);
	const [defaultWidth, setDefaultWidth] = useState<number>(0);
	const [errors, setErrors] = useState<{[key: string]: Array<string>}>({});
	// 0: fillable, 1: loading (sending email), 2: submitted
	const [formState, setFormState] = useState<number>(0);
	const nameToReadable: {[key: string]: string} = {fname: "first name", lname: "last name", email: "email", phone: "phone number", message: "message"};

	const context = useContext(ContextProvider);

	const captchaRef = useRef();

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (formState != 0)
			return;

		const formData: FormData = new FormData(event.currentTarget);

		let newErrors: {[key: string]: Array<string>} = {}
		/////////////////// Validation
		if (true)
			Object.keys(nameToReadable).forEach((key: string) => {
				const val = formData.get(key) as string | null;
				if (val == null || val.trim().length == 0){
					if (!newErrors[key])
						newErrors[key] = [];
					newErrors[key].push("The " + nameToReadable[key] + " field is required.");
				}
			});
		setErrors(newErrors);
		if (Object.keys(newErrors).length == 0){
			setFormState(1);
			console.log(captchaRef.current?.executeAsync);
			captchaRef.current?.executeAsync().then((token) => {
				console.log(formRef.current, token);
				wait()
//				emailjs.sendForm("service_6omc8df","template_2e6g0zv", formRef.current, {publicKey: "lDCeJnFwBEYnQGVHD"}, )
					.then(
						() => setFormState(2),
						(error) => {
							console.log(error);
							setErrors({form: ["The form could not be submitted. Please email support@eppytech.com with your information and mention this error.", error]});
							setFormState(0);
						});
			}, (error) => {
				console.log(error);
				setErrors({form: ["There was an error with reCAPTCHA. Please email support@eppytech.com with your information and mention this error.", error]});
				setFormState(0);
			});
		}
	}

	const wait = () => {
		return new Promise((resolve, reject) => setTimeout(() => {
			resolve('done');
		}, 2000));
	}

	const formField = (label: string, type: string, key: string): ReactElement => {
		return (
			<div className={[styles.block, errors[key] ? styles.error : ""].join(" ")}>
				<label htmlFor={key}>{label}</label>
				<input type={type} id={key} name={key} onInput={() => {
					if (errors[key])
						setErrors((oldErrors: {[key: string]: Array<string>}) => {
							let newErrors: {[key: string]: Array<string>} = {}
							Object.keys(oldErrors).forEach((nKey: string) => {
								if (key !== nKey)
									newErrors[nKey] = oldErrors[nKey];
							});
							return newErrors;
						});
				}}/>
				<AnimatePresence>
					{errors[key] && errors[key].map((err, idx) => (
						<motion.div key={idx} animate={{height: 'auto'}} initial={{height: 0}} exit={{height: 0}} style={{overflow: 'hidden'}}>
							<div className={styles.errorMsg}>
								<FontAwesomeIcon icon={faCircleExclamation} style={{width: '1rem', height: '1rem', paddingRight: '0.5rem'}} ariahidden="true"/>
								{err}
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</div>
		);
	}

	if (!context)
		return (<div/>);

	return (
		<div>
			<Header selectedPage={1}/>
			<main className={styles.main} style={context.singleCol ? {flexDirection: 'column'} : {}} id="main">
				<div style={context.singleCol ? {} : {maxWidth: '50%'}}>
					<h1>Get A Free Consultation</h1>
					<br/>
					<p>Fill out the form to receive a free consultation and learn how we can help make your technology worry-free!</p>
					<div className={styles.formCard}>
						<form className={styles.form} onSubmit={onSubmit} ref={formRef} autoComplete="on">
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
								<div style={{display: 'flex'}}>
									<motion.div className={styles.button} layout style={{borderRadius: 50, padding: 0, overflow: 'hidden'}} transition={{duration: 0.5}} disabled={formState != 0}>
										{formState == 0 ? (
											<motion.input layout className={styles.button} style={{margin: 0, boxShadow: 'none', fontFamily: 'inherit'}}
												type="submit" value="SUBMIT" disabled={formState != 0} key="0"/>
										) : (
											<motion.div layout style={{padding: '1rem', display: 'flex', flexDirection: 'row'}}>
												<div ref={el => {
													if (el)
														setDefaultWidth(el.offsetHeight);
												}}>SUBMITTING</div>
												<motion.div className={styles.loader} animate={{rotate: 360}} transition={{repeat: Infinity, duration: 1}} style={{height: defaultWidth, width: defaultWidth}}>
												</motion.div>
											</motion.div>
										)}
									</motion.div>
								</div>
									<ReCAPTCHA
										ref={captchaRef}
										size="invisible"
										sitekey="6LcfmxwqAAAAAOnvSZd-1-wNNw3vPGslu1OdLHal"
										badge="inline"
									/>
							</fieldset>
						</form>
						<AnimatePresence>
							{formState == 2 && (
								<motion.div style={{top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem', position: 'absolute', backgroundColor: '#fff'}}
								animate={{opacity: '100%'}} initial={{opacity: '0%'}} exit={{opacity: '0%'}} transition={{duration: 1, ease: [0.65, 0, 0.35, 1]}}
								onAnimationComplete={def => {
									if (formRef.current)
										formRef.current.reset();
								}}>
									<RoundedButton onClick={() => setFormState(0)} arialabel="Return">
										<FontAwesomeIcon icon={faChevronLeft} style={{width: '1rem', height: '1rem'}} ariahidden="true"/>
									</RoundedButton>
									<div>
										<div className={styles.overlayDiv} style={{filter: 'blur(16px)', opacity: 0.5}} ariahidden="true">
											<ExportedImage
												src={logoImageStatic}
												width={400}
												height={400}
												priority
											/>
										</div>
										<div className={styles.overlayDiv}>
											<h3>
											Thank you!  Your information has been submitted. A member of our team will be in touch.
											</h3>
											<button className={styles.button} onClick={() => setFormState(0)} style={{marginTop: '1rem'}}>Return</button>
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
				<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
					<h3>Eppy Tech</h3>
					100 Heights Road
					<br/>
					Darient, CT 06820
					<br/><br/>
					<h3>Phone:</h3>
					<Link href="tel:203-655-5177">(203) 655-5177</Link>
					<br/>
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.985761971037!2d-73.49853742331341!3d41.06930387134207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2a05b365b12ef%3A0xb14fe1975dc0f6d3!2sEppy%20Tech!5e0!3m2!1sen!2sus!4v1710969744321!5m2!1sen!2sus"
						style={{border:0}} width='400' height='400' allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
				</div>
			</main>
			<Footer/>
		</div>
	);
}
