import React, { useState, useEffect } from "react";
import useMarvelService from "../components/services/MarvelSevices";
import ErrorMessage from "../components/errorMessage/error";
import Spiner from "../components/spinner/spiner";

export const useLoadingMarvelData = (initialOffset, usingComponent, numOfItemLoading) => {
	console.log(usingComponent);

	const [data, setData] = useState([]);
	const [offset, setOfsset] = useState(initialOffset);
	const [newItemLoading, setNewItemLoading] = useState(true);
	const [comicsEnded, setComicsEnded] = useState(false);
	const [loadOnScroll, setLoadOnScroll] = useState(false);

	const { loading, error, getComics, clearError, getAllCharacters } = useMarvelService();

	useEffect(() => {
		onRequest(true);
		window.addEventListener('scroll', onRequestScroll);
		return () => {
			window.removeEventListener('scroll', onRequestScroll);
		}
	}, [])

	useEffect(() => {
		if (loadOnScroll) {
			onRequest();
		}
	}, [loadOnScroll])

	const onComicsLoaded = (newData) => {
		let ended = false;
		if (newData.length < numOfItemLoading) {
			ended = true;
		}
		setLoadOnScroll(false)
		setComicsEnded(charEnded => ended);
		setOfsset(offset => offset + numOfItemLoading);
		setData((data) => [...data, ...newData]);
		setNewItemLoading(newItemLoading => false);
	}

	const onRequest = (initial) => {
		//Pagination && //Get characters from Marvel API
		clearError()
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		if (usingComponent === 'comics') {
			getComics(offset)
				.then(onComicsLoaded)
		} else {
			getAllCharacters(offset)
				.then(onComicsLoaded)
		}
	};

	const onRequestScroll = () => {
		const scrollTop = window.scrollY;
		const screen = window.innerHeight;
		const heigth = document.documentElement.scrollHeight;
		if (scrollTop + screen === heigth) {
			setLoadOnScroll(true);
		}
	}

	const style = comicsEnded ? { display: "none" } : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spiner /> : null;

	return { style, errorMessage, spinner, onRequest, newItemLoading, data }
}

