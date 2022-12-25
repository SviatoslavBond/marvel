import React, { useState, useEffect } from "react";
import './singleComic.scss';
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from 'react-router-dom';
import useMarvelService from '../services/MarvelSevices';
import AppBanner from '../appBanner/AppBanner';

import ErrorMessage from '../errorMessage/error';
import Spiner from "../spinner/spiner";

const SingleComic = () => {
	const { id } = useParams();
	const [data, setData] = useState([]);

	const {
		loading,
		error,
		clearError,
		getSingleComics,
		setLoading,
	} = useMarvelService();

	useEffect(() => {
		onRequest();
	}, [id]);

	const onDataLoaded = (newData) => {
		setLoading(false);
		setData(newData);
	};

	const onRequest = () => {
		clearError();
		getSingleComics(id)
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
	const { url, imgLink, title, descr, pageCount, language, price } = data;
	return (
		<>
			<Helmet>
				<meta
					name="description"
					content={`${title} comic book`}
				/>
				<title>{title}</title>
			</Helmet>
			<div className="single-comic">
				<a href={url}>
					<img src={imgLink} alt={title} className="single-comic__img" />
				</a>
				<div className="single-comic__info">
					<h2 className="single-comic__name">{title}</h2>
					<p className="single-comic__descr">{descr}</p>
					<p className="single-comic__descr">{pageCount}</p>
					<p className="single-comic__descr">Language: {language}</p>
					<div className="single-comic__price">{price + '$'}</div>
				</div>
				<button onClick={() => navigate(-1)} className="single-comic__back">Back to all</button>
			</div>
		</>
	)
}

export default SingleComic;