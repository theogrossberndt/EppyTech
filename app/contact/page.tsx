"use client"

import { useEffect, useRef, useState, FormEvent } from 'react';
import styles from "./page.module.css";
import Header from "@/app/lib/header.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion';
import IconButton from "@/app/lib/iconButton.tsx";
import emailjs from '@emailjs/browser';
import ExportedImage from "next-image-export-optimizer";
import logoImageStatic from "/public/images/logoCropped.jpg";

export default function ContactPage(){
	const formRef = useRef(null);
	const [defaultWidth, setDefaultWidth] = useState<number>(0);
	const [errors, setErrors] = useState({});
	// 0: fillable, 1: loading (sending email), 2: submitted
	const [formState, setFormState] = useState<number>(0);
	const [maxDimensions, setMaxDimensions] = useState({width: 0, height: 0});
	const nameToReadable = {fname: "first name", lname: "last name", email: "email", phone: "phone number", message: "message"};


	const onSubmit = async (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		if (formState != 0)
			return;

		const formData = new FormData(event.currentTarget);

		let newErrors = {}
		/////////////////// Validation
		if (true)
			formData.forEach((val, key) => {
				if (val.trim().length == 0){
					if (!newErrors[key])
						newErrors[key] = [];
					newErrors[key].push("The " + nameToReadable[key] + " field is required.");
				}
			});
		setErrors(newErrors);
		if (Object.keys(newErrors).length == 0 && formRef.current){
			setFormState(1);
			wait()
//			emailjs.sendForm("service_6omc8df","template_2e6g0zv", formRef.current, {publicKey: "lDCeJnFwBEYnQGVHD"})
				.then(
					() => setFormState(2),
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

	useEffect(() => {
		if (!formRef.current)
			return;
		const resizeObserver = new ResizeObserver(() => {
			const cs = getComputedStyle(formRef.current);
			var paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
			var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

			var borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
			var borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

			setMaxDimensions({width: formRef.current.offsetWidth-paddingX-borderX, height: formRef.current.offsetHeight-paddingY-borderY});
		});
		resizeObserver.observe(formRef.current);
		return () => resizeObserver.disconnect();
	}, [formRef.current])

	return (
		<div>
			<Header selectedPage={1} refFunc={(el) => {}}/>
			<main className={styles.main} id="main">
				<div style={{maxWidth: '50%'}}>
					<h1>Get A Free Consultation</h1>
					<br/>
					<p>Fill out the form to receive a free consultation and learn how we can help make your technology worry-free!</p>
					<div className={styles.formCard}>
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
						<AnimatePresence>
							{formState == 2 && (
								<motion.div style={{width: maxDimensions.width, height: maxDimensions.height, position: 'absolute', backgroundColor: '#fff'}}
								animate={{opacity: '100%'}} initial={{opacity: '0%'}} exit={{opacity: '0%'}} transition={{duration: 1, ease: [0.65, 0, 0.35, 1]}}
								onAnimationComplete={def => {
									if (formRef.current)
										formRef.current.reset();
								}}>
									<IconButton onClick={() => setFormState(0)}>
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
											<button className={styles.button} onClick={() => setFormState(0)} style={{marginTop: '1rem'}}>Submit Another Form</button>
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
				<div style={{}}>
					<h3>Eppy Tech</h3>
					100 Heights Road
					<br/>
					Darient, CT 06820
					<br/><br/>
					<h3>Phone:</h3>
					<h3>(203) 655-5177</h3>
					<br/>
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.985761971037!2d-73.49853742331341!3d41.06930387134207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2a05b365b12ef%3A0xb14fe1975dc0f6d3!2sEppy%20Tech!5e0!3m2!1sen!2sus!4v1710969744321!5m2!1sen!2sus"
						style={{border:0}} width='400' height='400' allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
				</div>
			</main>
		</div>
	);
}
