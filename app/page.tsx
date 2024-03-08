import Image from "next/image";
import styles from "./page.module.css";
import Header from "./ui/header";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
		<main className={[]}>
			<Header selectedPage={0}/>
			<div className={styles.body}>
				<div className={styles.about}>
						<Image
							src="/front.jpg"
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
								<Image
									src="/logoCropped.jpg"
									alt="Eppy Tech Building"
									width={400}
									height={400}
									priority
								/>
							</div>
							<div className={[styles.overlayDiv]}>
								<h1>About Us</h1><br/>
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
			</div>
		</main>
	);
/*
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
*/
}
