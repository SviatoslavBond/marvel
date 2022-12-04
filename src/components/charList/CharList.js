import React from "react";
import CharItems from "../charItems/CharItems";
// import ErrorMessage from "../errorMessage/error";
// import Spiner from "../spinner/spiner";
// import useMarvelService from "../services/MarvelSevices";
import { useLoadingMarvelData } from '../../hooks/loadingData.hook';
import "./charList.scss";

const CharList = (props) => {
	// const [data, setData] = useState([]);
	// const [offset, setOfsset] = useState(210);
	// const [newItemLoading, setNewItemLoading] = useState(true);
	// const [charEnded, setCharEnded] = useState(false);
	// const [loadOnScroll, setLoadOnScroll] = useState(false);

	// const { error, loading, getAllCharacters } = useMarvelService();

	// useEffect(() => {
	// 	onRequest(true);
	// 	window.addEventListener('scroll', onRequestScroll);
	// 	return () => {
	// 		window.removeEventListener('scroll', onRequestScroll);
	// 	}
	// }, []);
	// useEffect(() => {
	// 	if (loadOnScroll) {
	// 		onRequest();
	// 	}
	// }, [loadOnScroll])

	// const onChararctersLoaded = (newData) => {
	// 	// changing the state according to the data received from the server
	// 	let ended = false;
	// 	if (newData.length < 9) {
	// 		ended = true;
	// 	}
	// 	setLoadOnScroll(false)
	// 	setOfsset((offset) => offset + 9);
	// 	setCharEnded(charEnded => ended);
	// 	setNewItemLoading(newItemLoading => false);
	// 	setData((data) => [...data, ...newData]);
	// };

	// const onRequest = (initial) => {
	// 	//Pagination && //Get characters from Marvel API
	// 	initial ? setNewItemLoading(false) : setNewItemLoading(true);
	// 	getAllCharacters(offset)
	// 		.then(onChararctersLoaded)
	// };

	// const onRequestScroll = () => {
	// 	console.log(`'scroll'${offset}`);
	// 	const scrollTop = window.scrollY;
	// 	const screen = window.innerHeight;
	// 	const heigth = document.documentElement.scrollHeight;
	// 	if (scrollTop + screen === heigth) {
	// 		setLoadOnScroll(newItemLoading => true);
	// 	}
	// }

	// const style = charEnded ? { display: "none" } : null;
	// const errorMessage = error ? <ErrorMessage /> : null;
	// const spinner = loading && !newItemLoading ? <Spiner /> : null;
	// const content = !(loading || error) ? <CharItems data={data} onCharacterComics={props.onCharacterComics} /> : null;
	const {
		errorMessage,
		spinner,
		newItemLoading,
		onRequest,
		style,
		data } = useLoadingMarvelData(210, 'characters', 9)

	return (
		<div className="char__list">
			{/* {error ? <ErrorMessage /> : loading && !newItemLoading ? <Spiner /> : <CharItems data={data} onCharacterComics={props.onCharacterComics} />} */}
			{errorMessage}
			{spinner}
			<CharItems data={data} onCharacterComics={props.onCharacterComics} />
			<button
				disabled={newItemLoading}
				style={style}
				className="button button__main button__long"
			>
				<div className="inner" onClick={() => onRequest()}>
					load more
				</div>
			</button>
		</div>
	);
};

export default CharList;
