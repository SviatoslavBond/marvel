import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../services/MarvelSevices';
import Spiner from '../spinner/spiner';
import ErrorMessage from '../errorMessage/error';
class RandomChar extends Component {

	state = {
		character: {},
		loading: true,
		error: false
	}
	marvel = new MarvelService();

	onChararcterLoading = (character) => {
		this.setState({ character, loading: false, error: false })
	}

	randomChar = () => {
		this.setState({ loading: true })
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		this.marvel
			.getCharacter(id)
			.then(this.onChararcterLoading)
			.catch(this.onError);
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}

	componentDidMount = () => {
		this.randomChar();
	}

	render() {
		const { character, loading, error } = this.state;

		return (
			<div className="randomchar">
				{error ? <ErrorMessage /> : loading ? <Spiner /> : <View character={character} />}

				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">
						Or choose another one
					</p>
					<button onClick={this.randomChar} className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		)
	}
}

const View = ({ character }) => {
	const { thumbnail, name, description, homepage, wiki, isImg } = character;

	const style = isImg ? { objectFit: 'contain' } : null;

	return (
		<div className="randomchar__block">

			<img src={thumbnail} alt="Random character" className="randomchar__img" style={style} />

			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
					{description || 'There is no information for this character, follow the link below to read more'}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main" target={'_blank'}>
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary" target={'_blank'}>
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}
export default RandomChar;