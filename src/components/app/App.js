import React from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

import decoration from "../../resources/img/vision.png";

const App = () => {
	const [charSelectedId, setCharId] = React.useState(null);

	const onCharSelected = (id) => {
		setCharId(id);
	};

	return (
		<div className="app">
			<AppHeader />
			<main>
				<RandomChar />

				<div className="char__content">
					<CharList onCharacterComics={onCharSelected} />
					<ErrorBoundary>
						<CharInfo idChar={charSelectedId} />
					</ErrorBoundary>
				</div>
				{/* <AppBanner />
				<ComicsList /> */}
				<img className="bg-decoration" src={decoration} alt="vision" />
			</main>
		</div>
	);
};

export default App;
