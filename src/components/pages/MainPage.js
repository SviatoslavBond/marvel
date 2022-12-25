import React from "react";
import { Helmet } from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";

const MainPage = () => {
	const [charSelectedId, setCharId] = React.useState(null);

	const onCharSelected = (id) => {
		setCharId(id);
	};
	return (
		<>
			<Helmet>
				<meta
					name="description"
					content="Marvel information portal"
				/>
				<title>Marvel information portal</title>
			</Helmet>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharacterComics={onCharSelected} />
				</ErrorBoundary>

				<ErrorBoundary>
					<CharInfo idChar={charSelectedId} />
				</ErrorBoundary>
			</div>

			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	);
};

export default MainPage;
