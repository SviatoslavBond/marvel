import { Component } from "react";
import PropTypes from 'prop-types'
import CharItems from "../charItems/CharItems";
import ErrorMessage from '../errorMessage/error';
import Spiner from '../spinner/spiner';
import MarvelService from '../services/MarvelSevices';
import './charList.scss';


class CharList extends Component {

	state = {
		data: [], // data received from the server
		loading: true,
		error: false,
		offset: 1000,
		newItemLoading: false,
		bottomPage: true,
		charEnded: false
	}


	marvel = new MarvelService();


	onChararctersLoaded = (newData) => {// changing the state according to the data received from the server
		let ended = false;
		if (newData.length < 9) {
			ended = true;
		}
		this.setState(({ offset, data: prevData }) => ({
			data: [...prevData, ...newData],
			loading: false,
			newItemLoading: false,
			offset: offset + 9,
			bottomPage: true,
			charEnded: ended
		}))
	}

	onSelectedCard = (id) => {
		this.setState(({ data }) => ({
			data: data.map(item => item.id === id ? { ...item, active: true } : { ...item, active: false })
		}))
	}

	onError = () => { // ERROR PROCESSING
		this.setState({
			loading: false,
			error: true
		})
	}

	onRequest = (offset) => { //Pagination && //Get characters from Marvel API
		this.onCharListLoading();
		this.marvel
			.getAllCharacters(offset)
			.then(this.onChararctersLoaded)
			.catch(this.onError)
	}

	onCharListLoading = () => {
		this.setState({ newItemLoading: true })
	}

	onRequestScroll = () => {
		const { bottomPage, offset } = this.state;
		const scrollTop = window.scrollY;
		const screen = window.innerHeight;
		const heigth = document.documentElement.scrollHeight;
		if (scrollTop + screen === heigth && bottomPage) {
			this.onBottomPage();
			this.onRequest(offset);
		}
	}

	onBottomPage = () => {
		this.setState({ bottomPage: false })
	}

	componentDidMount() {
		this.onRequest();
		window.addEventListener('wheel', this.onRequestScroll);
	}
	componentWillUnmount() {
		window.removeEventListener('wheel', this.onRequestScroll);
	}

	render() {
		const { loading, data, error, offset, newItemLoading, charEnded } = this.state
		const style = charEnded ? { 'display': 'none' } : null
		return (
			<div className="char__list">
				{error ? <ErrorMessage /> : loading ? <Spiner /> :
					<CharItems
						data={data}
						onSelectedCard={this.onSelectedCard}
						onCharacterComics={this.props.onCharacterComics} />
				}
				<button
					disabled={newItemLoading}
					style={style}
					className="button button__main button__long">
					<div className="inner" onClick={() => this.onRequest(offset)}>load more</div>
				</button>
			</div>
		)
	}

}


export default CharList;