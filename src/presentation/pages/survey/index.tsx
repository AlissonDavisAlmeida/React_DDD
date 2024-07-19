import { type FC } from "react";
import styles from "./survey-list-styles.scss";
import { Footer, LogoTip } from "@/presentation/components";

interface SurveyListProps {

}

export const SurveyList: FC<SurveyListProps> = ({ }) => {
  return (
	<div className={styles.surveyListWrap} >
		<header className={styles.headerWrap}>
			<div className={styles.headerContent}>
				<LogoTip />

				<div className={styles.logoutWrap}>
					<span>Alisson</span>

					<a href="#">Sair</a>
				</div>
			</div>
		</header>

		<main className={styles.contentWrap}>
			<h2>Enquetes</h2>

			<ul role="list">
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
			</ul>
		</main>

		<Footer />
	</div>
  );
};
