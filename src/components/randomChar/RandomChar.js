import React, { useState, useEffect } from "react";

import useMarvelService from "../services/MarvelSevices";
import Spiner from "../spinner/spiner";
import ErrorMessage from "../errorMessage/error";

import mjolnir from "../../resources/img/mjolnir.png";

import "./randomChar.scss";

const RandomChar = React.memo(() => {
	const [character, setCharacter] = useState([]);

	useEffect(() => {
		randomChar();
	}, []);

	const { loading, error, getCharacter, clearError } = useMarvelService();



	const onChararcterLoading = (character) => {
		setCharacter(character);
	};

	const randomChar = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		getCharacter(id).then(onChararcterLoading);
	};

	return (
		<div className="randomchar">
			{error ? (
				<ErrorMessage />
			) : loading ? (
				<Spiner />
			) : (
				<View character={character} />
			)}

			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">Or choose another one</p>
				<button onClick={randomChar} className="button button__main">
					<div className="inner">try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
			</div>
		</div>
	);
});

const View = ({ character }) => {
	const { thumbnail, name, description, homepage, wiki, isImg } = character;

	const style = isImg ? { objectFit: "contain" } : null;

	return (
		<div className="randomchar__block">
			<img
				src={thumbnail}
				alt="Random character"
				className="randomchar__img"
				style={style}
			/>
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
					{description ||
						"There is no information for this character, follow the link below to read more"}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main" target={"_blank"}>
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary" target={"_blank"}>
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};
export default RandomChar;
