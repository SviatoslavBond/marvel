import React, { useState, useEffect } from "react";
import './singleChar.scss';

import { useParams, Link, useNavigate } from 'react-router-dom';
import useMarvelService from '../services/MarvelSevices';
import AppBanner from '../appBanner/AppBanner';

import ErrorMessage from '../errorMessage/error';
import Spiner from "../spinner/spiner";
const SingleComic = () => {
	const { name } = useParams();

	const [data, setData] = useState([]);

	const {
		loading,
		error,
		clearError,
		getCharacterOnName,
		setLoading,
	} = useMarvelService();

	useEffect(() => {
		onRequest();
	}, [name]);

	const onDataLoaded = (newData) => {
		setLoading(false);
		setData(newData);
	};

	const onRequest = () => {
		clearError();
		getCharacterOnName(name)
			.then(onDataLoaded)
	};

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spiner /> : null;
	const content = loading || error ? null : <View data={data} />;

	return (
		<>
			<AppBanner />
			{errorMessage}
			{spinner}
			{content}
		</>

	)
}
const View = ({ data }) => {
	const navigate = useNavigate();
	const { url, name, description, thumbnail } = data;
	return (
		<>
			<div className="single-char">
				<a href={url}>
					<img src={thumbnail} alt={name} className="single-char__img" />
				</a>
				<div className="single-char__info">
					<h2 className="single-char__name">{name}</h2>
					<p className="single-char__descr">{description || 'There is not description'}</p>
				</div>
				<button onClick={() => navigate(-1)} className="single-char__back">Back home page</button>
			</div>
		</>
	)
}

export default SingleComic;