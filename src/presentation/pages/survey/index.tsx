import { type FC } from "react";
import styles from "./survey-list-styles.scss";
import { Footer, Header, Icon, IconName } from "@/presentation/components";

interface SurveyListProps {
  title?: string
}

export const SurveyList: FC<SurveyListProps> = () => {
  return (
	<div className={styles.surveyListWrap} >
		<Header />

		<main className={styles.contentWrap}>
			<h2>Enquetes</h2>

			<ul role="list">
				<li role="listitem">
					<div className={styles.surveyContent}>
						<Icon
							iconName={IconName.thumbUp}
							className={styles.iconWrapper}
						/>

						<time>
							<span className={styles.day}>22</span>

							<span className={styles.month}>05</span>

							<span className={styles.year}>2023</span>
						</time>

						<section>
							<p>Qual é o seu framework web favorito?</p>
						</section>
					</div>

					<footer>Ver resultado</footer>
				</li>

				<li />

				{/* <li role="listitem">
					<div className={styles.surveyContent}>

						<time>
							<span className={styles.day}>22</span>

							<span className={styles.month}>05</span>

							<span className={styles.year}>2023</span>
						</time>

						<section>
							<p>Qual é o seu framework web favorito?</p>
						</section>
					</div>

					<footer>Ver resultado</footer>
				</li>

				<li role="listitem">
					<div className={styles.surveyContent}>
						<time>
							<span className={styles.day}>22</span>

							<span className={styles.month}>05</span>

							<span className={styles.year}>2023</span>
						</time>

						<section>
							<p>Qual é o seu framework web favorito?</p>
						</section>
					</div>

					<footer>Ver resultado</footer>
				</li>

				<li role="listitem">
					<div className={styles.surveyContent}>
						<time>
							<span className={styles.day}>22</span>

							<span className={styles.month}>05</span>

							<span className={styles.year}>2023</span>
						</time>

						<section>
							<p>Qual é o seu framework web favorito?</p>
						</section>
					</div>

					<footer>Ver resultado</footer>
				</li>

				<li role="listitem">
					<div className={styles.surveyContent}>
						<time>
							<span className={styles.day}>22</span>

							<span className={styles.month}>05</span>

							<span className={styles.year}>2023</span>
						</time>

						<section>
							<p>Qual é o seu framework web favorito?</p>
						</section>
					</div>

					<footer>Ver resultado</footer>
				</li>

				<li role="listitem">
					<div className={styles.surveyContent}>
						<time>
							<span className={styles.day}>22</span>

							<span className={styles.month}>05</span>

							<span className={styles.year}>2023</span>
						</time>

						<section>
							<p>Qual é o seu framework web favorito?</p>
						</section>
					</div>

					<footer>Ver resultado</footer>
				</li>

				<li role="listitem">
					<div className={styles.surveyContent}>
						<time>
							<span className={styles.day}>22</span>

							<span className={styles.month}>05</span>

							<span className={styles.year}>2023</span>
						</time>

						<section>
							<p>Qual é o seu framework web favorito?</p>
						</section>
					</div>

					<footer>Ver resultado</footer>
				</li>

				<li role="listitem">
					<div className={styles.surveyContent}>
						<time>
							<span className={styles.day}>22</span>

							<span className={styles.month}>05</span>

							<span className={styles.year}>2023</span>
						</time>

						<section>
							<p>Qual é o seu framework web favorito?</p>
						</section>
					</div>

					<footer>Ver resultado</footer>
				</li>

				<li role="listitem">
					<div className={styles.surveyContent}>
						<time>
							<span className={styles.day}>22</span>

							<span className={styles.month}>05</span>

							<span className={styles.year}>2023</span>
						</time>

						<section>
							<p>Qual é o seu framework web favorito?</p>
						</section>
					</div>

					<footer>Ver resultado</footer>
				</li> */}
			</ul>
		</main>

		<Footer />
	</div>
  );
};
