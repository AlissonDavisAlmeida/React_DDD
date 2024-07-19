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
						<div className={styles.iconWrapper}>

							<img
								className={styles.icon}
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAEgAAAAA9nQVdAAAA0klEQVQ4EWNgIAH8//+/AYhLSNCCWynUMCD1/zcQG+BWSYQMkmEgA0Egjght2JUANYO8iQ4MsasmIAo0BZthP4DirAS0YkrjMAzk0tOYqgmIADUVgnTiADPxakfStAWmECj2DkmcWOYjoEJPRpBqmEGMQABiI4vB5IikH1PbQAYmIm0mVtlLahu4nJpe/gf0hho1XbgVGKd3qWngRFBA4/LyX6AcKZZdBbpOB2QgLk1nQJIkgElwtaBEDAXIOUULKHYSiP/CJHHQX4Hic4CYBWYgADx8PyqFiuhJAAAAAElFTkSuQmCC"
								alt="icon"
							/>
						</div>

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
						<div className={`${styles.iconWrapper_invalid}`}>

							<img
								className={styles.icon}
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAEgAAAAA9nQVdAAAA70lEQVQ4Ea2RPQoCQQyFZ/w5g72lYOEVPIiV2IkIHmCvIZ5D77BgZWtrYWe1ICiuL8tEwjIZZmYNZCf7knyTzRrjrK7rAfwAr+AheyNZwiei98gNrBkISxYjz5KbZb0V4gXxlN8jzo+1tk91BOT6nhPmOFNg1Nb0UiCNxY0Uu8QW044BuMIZHs3DJzcra3/yOgem3UoT3pEcaQUh3TchAX9/KNTsy/mAtLebrzhXI+AqE/oQl55ErIfYxp5WothW71QyAJ0VWKG06DJAQ/jTA0yH0TUAzf4Gc8BFC5g3GcHI3IQvBy0asesDsB08CfYFB/44kX6+Hj8AAAAASUVORK5CYII="
								alt="icon"
							/>
						</div>

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
