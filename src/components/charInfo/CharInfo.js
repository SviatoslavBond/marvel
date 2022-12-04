import { useState, useEffect } from "react";

import useMarvelService from "../services/MarvelSevices";
import Spiner from "../spinner/spiner";
import ErrorMessage from "../errorMessage/error";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

const CharInfo = ({ idChar }) => {
	const [character, setCharacter] = useState(null); //1 Вибраний персонаж

	const { loading, error, getCharacter } = useMarvelService();

	useEffect(() => {
		updateCharacter();
	}, []);

	useEffect(() => {
		updateCharacter();
	}, [idChar]);

	const onChararcterLoading = (character) => {
		setCharacter(character);
	};

	const updateCharacter = () => {
		if (!idChar) {
			return;
		}
		getCharacter(idChar)
			.then(onChararcterLoading)
	};

	const skeleton = character || loading || error ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spiner /> : null;
	const content = loading || error || !character ? null : <View char={character} />;
	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, id, comics, isImg } = char;
	const style = isImg ? { objectFit: "contain" } : null;

	if (comics.length > 10) {
		comics.length = 10;
	}
	const comicsInfo = comics.map((item, i) => {
		return (
			<li className="char__comics-item" key={id + i}>
				{item.name}
			</li>
		);
	});

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={style} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a
							href={homepage}
							className="button button__main"
							target={"_blank"}
						>
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary" target="_blank">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description ||
					"There is no information for this character, follow the link  to read more"}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comicsInfo.length > 0 ? comicsInfo : <li>Сharacter has no comics</li>}
			</ul>
		</>
	);
};

export default CharInfo;
