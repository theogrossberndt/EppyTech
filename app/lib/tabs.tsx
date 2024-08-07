type ServiceDefType = {
	title: string;
	description: string;
	keyWords: Array<string>;
};

type ServicesType = {
	[key: string]: ServiceDefType;
};

const services: ServicesType = {
	'managed-services': {
		title: 'Managed Services - Eppy Tech Connecticut',
		description: 'With Managed Services provided by Eppy Tech, get all of your IT support needs met for your local Connecticut business.',
		keyWords: ['managed', 'services', 'connecticut', 'ct', 'it', 'provider']
	},
	'help-desk': {
			title: 'Help Desk - Eppy Tech Connecticut',
			description: 'With Help Desk support provided by Eppy Tech, get assistance on a variety of IT needs for your local Connecticut business.',
			keyWords: ['help', 'desk', 'connecticut', 'ct']
	},
	'data-protection': {
		title: 'Data Protection - Eppy Tech Connecticut',
		description: "With Eppy Tech's Data Protection services, protect your local Connecticut business's critical data from disaster.",
		keyWords: ['data', 'protection', 'connecticut', 'ct']
	},
	'cloud-computing': {
		title: 'Cloud Computing - Eppy Tech Connecticut',
		description: "With Eppy Tech's Cloud Computing services, get your local Connecticut business's needs met with all the benefits of hosting a server but none of the upkeep.",
		keyWords: ['cloud', 'computing', 'hosting', 'server', 'connecticut', 'ct']
	},
	'phone-systems': {
		title: 'VoIP Phone Systems - Eppy Tech Connecticut',
		description: "With Eppy Tech's VoIP phone systems, make communication at your local Connecticut business easier.",
		keyWords: ['voip', 'phone', 'connecticut', 'ct']
	},
	'business-it-support': {
		title: 'Business IT Support - Eppy Tech Connecticut',
		description: "With Eppy Tech's Business IT Support, get hourly services for all your Connecticut business's computer needs.",
		keyWords: ['business', 'support', 'connecticut', 'ct']
	},
	'repair-services': {
		title: 'Repair Services - Eppy Tech Connecticut',
		description: "Have us repair your laptop, desktop, or printer in our complete break-fix shop.",
		keyWords: ['repair', 'laptop', 'desktop', 'printer', 'computer', 'connecticut', 'ct']
	},
}

const servicesOrder: Array<string> = ['managed-services', 'help-desk', 'data-protection', 'cloud-computing', 'phone-systems', 'business-it-support', 'repair-services'];

export function getMetadata(serviceCode: string): ServiceDefType {
	const data: ServiceDefType = services[serviceCode];
	return {
		...data,
		openGraph: {
			title: data.title,
			description: data.description,
			siteName: 'Eppy Tech Connecticut',
			locale: 'en_US',
			type: 'website'
		}
	};
}

export function isServiceSlug(slug: string): boolean{
	return slug in services;
}

export function getServiceSlug(idx: number): string {
	return servicesOrder[idx];
}

export function slugToIdx(slug: string): number{
	return servicesOrder.indexOf(slug);
}

export function ManagedServices(): React.ReactElement {
	return (
		<article>
			<h2>Managed Services: A Complete Solution For Small Businesses</h2>
			<br/>
			<p>
				When it comes to computer technology and IT support, small businesses in Connecticut have historically been at a disadvantage due to the high costs of hardware, setup, and staffing. 
				It’s too expensive to have a full IT department in-house – and too much effort to manage everything yourself. 
				If this sounds like your situation, we have a solution: A complete managed IT services plan, where we function as your virtual CIO to give you the technology and support you require.
			</p>
			<br/>
			<p><b>Eppy Tech’s</b> Managed Services programs provide:</p>
			<ul>
				<li><strong>On-demand assistance</strong> from our professional Connecticut-based IT support team</li>
				<li><strong>Low, fixed costs</strong> and basic monthly billing for all our services</li>
				<li><strong>Ongoing observation</strong> of your systems to anticipate and avoid problems</li>
				<li><strong>More time for you</strong> to focus on growing revenue</li>
			</ul>
			<br/>
			<p>
				Giving employees access to the latest in managed services technology and on-demand IT assistance will boost productivity and morale. 
				Plus, once you free yourself from the hassles of maintaining your IT infrastructure, you’ll have more time to dedicate to profit-building activities that help your Connecticut company grow.
			</p>
			<br/>
			<p>
				We’ll closely monitor your computer systems, anticipating and resolving problems before they occur and giving you answers to questions when you need them. 
				With us as your Connecticut managed services provider, you’ll get on-demand access to locally-based experts and big-business managed IT services at small-business prices. 
				With our flexible managed services programs, your IT and your budget planning become easier, allowing you to focus efforts on locating new sources of revenue.
			</p>
		</article>
	);
}

export function HelpDesk(): React.ReactElement {
	return (
		<article>
			<h2>Expert Technical Support Plans: The Computer Help You Need</h2>
			<br/>
			<p>
				Chances are that your company uses technology every day for key business functions: Shipping, marketing, accounting, customer management, and sales, just to name a few. 
				And with your dependence on technology comes the need for expert IT management and computer support – but as a small company, how can you afford it?
			</p>
			<br/>
			<p>
				Eppy Tech offers a way for you to get the qualified tech support your Connecticut business needs without employing an IT department. 
				Our computer support program provides assistance exactly when you need it, at a price that a small business like yours can afford.
			</p>
			<br/>
			<p><strong>What we provide</strong></p>
			<p>
				Our technical support gives your Connecticut business assistance with a wide variety of IT needs, including: Assistance with computers and networks; hardware design and configuration; 
				software installation and training; virus removal; data backup and recovery; and key computer support functions.
			</p>
			<br/>
			<p><strong>Want more reasons to use our tech support? Here are just a few:</strong></p>
			<ul>
				<li>A team of <strong>U.S.-based computer support experts </strong>available whenever you need them</li>
				<li>Help in meeting industry <strong>best practices</strong></li>
				<li><strong>Increased productivity</strong> and less downtime</li>
				<li>Reduced capital expenses (and <strong>more cash on hand</strong>)</li>
				<li><strong>More time</strong> for revenue-generating activities</li>
			</ul>
			<br/>
			<p>
				Building a technical support department requires more time, money, and resources than most Connecticut businesses can justify. 
				With our computer support plans, you’ll get better, more cost-effective service – and have access to a whole team of technical support experts just by picking up the phone.
			</p>
		</article>
	);
}

export function DataProtection(): React.ReactElement {
	return (
		<article>
			<h2>Could Your Company Endure the Loss of Its Critical Data?</h2>
			<br/>
			<p>
				What if your business suddenly lost its IT system and essential information as a result of a natural disaster, theft, or system breakdown? 
				Do you have a backup and data recovery program to get it all back? Connecticut-based Eppy Tech offers complete, dependable data recovery and backup solutions for companies just like yours.
			</p>
			<br/>
			<p>
				We provide a secure way to protect your vital data from loss due to hackers, worker theft, system failure, and natural disasters. 
				Our experts will work with you to evaluate your needs and create a solution tailored specifically to your business’ IT needs and budget.
			</p>
			<br/>
			<p><strong>Eppy Tech’s data backup and recovery products include:</strong></p>
			<ul>
				<li><strong>Protection against viruses</strong> and illegal access using the newest technology</li>
				<li><strong>Safe access </strong>to your data using our dedicated servers</li>
				<li><strong>Automated backup</strong> of your business data throughout the day, every day</li>
				<li>An off-site copy of your IT infrastructure that <strong>can be utilized as a spare within a few minutes</strong> in the event of a system failure at your company</li>
				<li>Monthly billing for your data protection services – with <strong>no added expenses</strong> for hardware or software</li>
			</ul>
			<br/>
			<p>
				If a fire, flood or other disaster damaged your office, having on-site data backup and recovery equipment wouldn’t be enough. 
				While a scenario like this will hopefully never take place, there are many other threats, including network and software application failures, which could require days to restore.
			</p>
			<br/>
			<p>Without access to essential information, would you be able to make contact with customers and vendors and continue to run your business? How long would your company get by?</p>
		</article>
	);
}

export function CloudComputing(): React.ReactElement {
	return (
		<article>
			<h2>Hosted &amp; Cloud Services, Handled By the Pros</h2>
			<br/>
			<p>
				If you’ve been dealing with the costs, risks and frustrations of having your business hosting your own servers, we’ve got good news for you. 
				Connecticut-based Eppy Tech offers secure IT hosting services that can be quickly implemented without any disruption to your business, while providing you with better performance, 
				expert IT hosting support, and guaranteed system security.
			</p>
			<br/>
			<p>Benefits of Eppy Tech’s business hosting and cloud solutions include:</p>
			<ul>
				<li><strong>Simplicity</strong> - You’ll have all the benefits – but none of the issues – of having a data center in-house. No worrying about storage space, the cost of setup, licensing, support, etc.&nbsp;</li>
				<li><strong>Enterprise-grade infrastructure </strong>offers features such as automatic data backup, and high-level performance, and 24/7 accessibility at prices your small company can afford</li>
				<li><strong>Maximum up-time</strong><strong> </strong><strong>– </strong>Built-in redundancy in multiple locations withstands service outages and keeps you up and running.</li>
				<li><strong>Server support –</strong>24/7 supervision of all physical devices, network and data center as well as remote access.</li>
				<li><strong>Secure data storage</strong> using the latest encryption technology, and multiple redundant storage sites which provide safety for your critical business data from loss and theft due to hackers, unauthorized access and natural disasters.&nbsp;</li>
				<li><strong>Scalability</strong> - Increase or decrease your company’s capabilities (and storage capacity) whenever you want without having to make capital investments in new equipment.&nbsp;</li>
				<li><strong>Service and Support</strong> - 24/7 cloud computing management pros monitor your systems and provide assistance when you need it to ensure total business continuity.&nbsp;</li>
			</ul>
			<br/>
			<p>
				To plan and implement this kind of solution in-house is way too labor-intensive – not to mention the costly hardware– for many Small to Medium Businesses (SMBs). 
				And it doesn’t end there – with ever-changing technology, as well as hardware and software upgrades, you always have to plan ahead. 
				Instead, those energies could be used to find new prospects, grow sales and explore new sources of profit.
			</p>
			<br/>
			<p>We offer secure, dependable, high-performance hosting and cloud services at low monthly rates, giving you the time and freedom to concentrate on your business objectives instead of your IT infrastructure.</p>
		</article>
	);
}

export function PhoneSystems(): React.ReactElement {
	return(
		<article>
			<h2>VoIP: A Better Choice for Business Communication</h2><br/>
			<p>
				What’s VoIP? VoIP, or Voice-over-IP (Internet-Protocol), is a better and more affordable way for businesses to communicate. 
				Using high-speed Internet connections to make and receive phone calls, these business phone systems offer options unavailable with traditional phones – and can potentially save you 
				thousands on long-distance and overseas calls. Eppy Tech will work with your Connecticut business to review your current usage, explore options and offer a VoIP business phone systems 
				plan to replace or enhance your existing system.
			</p>
			<br/>
			<p>Eppy Tech’s Voice-over-IP packages deliver you:</p>
			<ul>
				<li><strong>Low-cost</strong> hardware, support and upgrades</li>
				<li><strong>New features</strong> not available with older phone systems</li>
				<li><strong>Installation, maintenance, and support </strong>for Connecticut customers</li>
				<li><strong>Migration</strong> from your current business phone system to VoIP</li>
			</ul>
			<br/>
			<p>
				Voice-over-IP systems are a cost-conscious choice for businesses that regularly make long-distance or international calls. 
				And with our business phone systems, you don’t need to make a significant investment in capital equipment that will be obsolete almost immediately.
			</p>
			<br/>
			<p>
				VoIP systems can be accessed anywhere there’s an Internet connection. 
				If you have a traveling workforce, your employees will be able to make calls and access your phone system from around the world, increasing flexibility and productivity. 
				In addition, VoIP systems allow you to scale up or down as your business needs change.
			</p>
		</article>
	);
}

export function BusinessITSupport(): React.ReactElement {
	return (
		<article>
			<h2>Business IT Support: The Economical, Sensible Solution</h2><br/>
			<p>
				Tired of IT-related roadblocks? Find yourself in unfamiliar technical terrain? Want to give your overworked IT employees a break? 
				These are just a few of the most popular reasons that our Connecticut clients enlist Eppy Tech for cost-effective hourly business IT support. 
				Our staff brings far more than technical acumen to the table; we’re devoted to providing quick tech support solutions, outstanding customer service, and clear advice (not jargon) 
				to help your business thrive.
			</p>
			<br/>
			<p>
				Eppy Tech offers a more cost-effective alternative that scales perfectly to suit your needs: hourly business IT assistance. 
				We can respond to queries at a moment’s notice, deploying a full team of skilled Connecticut business IT support experts to help you troubleshoot problems, set up new software and 
				hardware, and restore crucial systems.
			</p>
			<br/>
			<p>Eppy Tech’s support specialists provide hourly support in the following areas (among others):</p>
			<ul>
				<li>Hardware installation and customization</li>
				<li>Network configuration and administration</li>
				<li>Software/application education and support</li>
				<li>Technical and Help Desk support</li>
			</ul>
			<br/>
			<p>
				In most instances, our technicians can work with you over the phone to answer questions and, through remote access to your system, solve irritating technical problems. 
				If hands-on tech support is required, Eppy Tech professionals will be dispatched to your business to deal with any issues and reduce downtime.
			</p>
		</article>
	);
}

export function RepairServices(): React.ReactElement {
	return (
		<article>
			<p>Eppy Tech is a complete break-fix shop with expertise in laptop, desktop and printer repair.</p>
			<br/>
			<p>Office Hours:</p>
			<br/>
			<p>Monday-Friday 8:30am - 5:30pm</p>
			<br/>
			<p>If you’d like to bring your hardware to us during our office hours, please call for an appointment at 203-655-5177 or email us at info@eppytech.com.</p>
			<br/>
			<p>Services include:</p>
			<ul>
				<li>PC repair, setup, &amp; troubleshooting</li>
				<li>Laser Printer repairs</li>
				<li>Data recovery &amp; transfer</li>
				<li>Virus &amp; spyware removal</li>
				<li>In-home service</li>
				<li>Walk-in flat fee service</li>
			</ul>
		</article>
	);
}
