import { Component } from "react";
import PropTypes from 'prop-types'
import MarvelService from "../services/MarvelSevices";
import Spiner from '../spinner/spiner';
import ErrorMessage from '../errorMessage/error';
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';


class CharInfo extends Component {


	state = {
		character: null, //1 Вибраний персонаж
		loading: false,
		error: false
	}

	marvel = new MarvelService();


	onChararcterLoading = (character) => {
		this.setState({ character, loading: false, error: false })
	}
	updateCharacter = () => {
		const { idChar } = this.props;
		if (!idChar) {
			return;
		}
		this.onCharLoading();
		this.marvel
			.getCharacter(idChar)
			.then(this.onChararcterLoading)
			.catch(this.onError)
	}
	onCharLoading = () => {
		this.setState({
			loading: true
		})
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}
	renderCards = (data, id) => {
		return data.map((item, i) => {
			return (
				<li className="char__comics-item" key={id + i}>
					{item.name}
				</li>
			)
		})
	}

	componentDidMount() {
		this.updateCharacter();
	}
	componentDidUpdate(prevProps) {
		if (this.props.idChar !== prevProps.idChar) {
			this.updateCharacter();
		}
	}

	render() {
		const { character, loading, error } = this.state;

		const skeleton = character || loading || error ? null : <Skeleton />;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spiner /> : null;
		const content = (loading || error || !character) ? null : <View char={character} />;
		return (
			<div className="char__info">
				{skeleton}
				{errorMessage}
				{spinner}
				{content}
			</div>
		)
	}
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, id, comics, isImg } = char;
	const style = isImg ? { objectFit: 'contain' } : null;

	if (comics.length > 10) {
		comics.length = 10
	}
	const comicsInfo = comics.map((item, i) => {
		return (
			<li className="char__comics-item" key={id + i}>
				{item.name}
			</li>
		)
	})

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={style} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main" target={'_blank'}>
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary" target='_blank'>
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description || 'There is no information for this character, follow the link  to read more'}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comicsInfo.length > 0 ? comicsInfo : <h4>Сharacter has no comics</h4>}
			</ul>
		</>
	)
}


export default CharInfo;



