import React from "react";
const CharItems = ({ data, onCharacterComics }) => {

	const listRef = [];

	const cards = data.map(item => {
		const { name, thumbnail, id, isImg, active } = item;

		const style = isImg ? { objectFit: 'contain' } : null;

		// let clazz = active ? "char__item char__item_selected" : 'char__item';
		const mycard = React.createRef();
		listRef.push(mycard);
		return (
			<li
				tabIndex={0}
				ref={mycard}
				className={'char__item'}
				key={id}
				onFocus={() => {
					onCharacterComics(id)
					listRef.forEach(item => item.current.className = 'char__item')
					mycard.current.className = 'char__item char__item_selected';
				}}
			>
				<img src={thumbnail} alt={name} style={style} />
				<div className="char__name">{name}</div>
			</li>
		)
	})
	return (
		<ul className="char__grid">
			{cards}
		</ul>
	)

}

export default CharItems;
