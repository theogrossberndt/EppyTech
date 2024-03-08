"use client";

import { useState } from 'react';
import ExportedImage from "next-image-export-optimizer";
import frontImageStatic from "/public/images/front.jpg";
import logoImageStatic from "/public/images/logoCropped.jpg";
import styles from "./page.module.css";
import Header from "./lib/header.tsx";
import Services from "./lib/services.tsx";
import { ManagedServices, HelpDesk, DataProtection, CloudComputing, PhoneSystems, BusinessITSupport, RepairServices } from "./lib/tabs.tsx";

export default function Home() {
	const [headerHeight, setHeaderHeight] = useState<number>(0);

	const headerRefFunc = (el: HTMLDivElement): void => {
		if (el != null)
			setHeaderHeight(el.offsetHeight);
	}

	return (
		<div>
			<Header selectedPage={0} refFunc={headerRefFunc}/>
			<main>
				<div className={styles.body}>
					<div className={styles.about}>
							<ExportedImage
								src={frontImageStatic}
								alt="Eppy Tech Building"
								width={600}
								height={500}
								priority
								style={{borderRadius: '5%'}}
							/>
						<div className={styles.aboutPadder}/>
						<div className={styles.aboutPane}>
							<div>
								<div className={styles.overlayDivCenter}>
									<ExportedImage
										src={logoImageStatic}
										alt="Eppy Tech Building"
										width={400}
										height={400}
										priority
									/>
								</div>
								<div className={styles.overlayDiv}>
									<h1>About Us</h1>
									<br/>
									<p>
									At Eppy Tech, we understand the challenges Connecticut small businesses face in attempting to afford, monitor and maintain their IT infrastructure. We offer a range of cost-effective tech support and managed IT services for small and mid-size businesses that will help you save time, protect and manage data more effectively, and increase employee productivity.
									</p><br/><p>
									Our computer support experts will work with you to comprehend the needs of your business and recommend options that will enhance your IT infrastructure, IT management and IT support – all to help you reach your future goals. Searching for new ways to manage your technology and receive the IT support you need? Looking to boost your current systems? We can find a solution that fits what you need – without ruining your budget.
									</p><br/><p>
									Our knowledgeable IT professionals, engineers and tech support staff are experienced in a wide range of industries and IT needs. We can help anticipate problems and respond rapidly when the need arises.
									</p><br/><p>
									Our expert managed IT services team will answer the questions you have and provide the service and support you count on. Plus, our programs are flexible, giving you the capacity to scale up or down as your business grows and changes. We’ll help make sure that your systems are operating at an optimal level so you can focus on building revenue and growing your business.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.about}>
						<Services services={["managed services", "help desk", "data protection", "cloud computing", "phone systems", "business it support", "repair services"]} headerHeight={headerHeight}>
							<ManagedServices/>
							<HelpDesk/>
							<DataProtection/>
							<CloudComputing/>
							<PhoneSystems/>
							<BusinessITSupport/>
							<RepairServices/>
						</Services>
					</div>
				</div>
			</main>
		</div>
	);
}
