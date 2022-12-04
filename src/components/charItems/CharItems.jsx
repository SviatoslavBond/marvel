import React, { useRef } from "react";
const CharItems = ({ data, onCharacterComics }) => {
	const listRef = useRef([]);

	const cards = data.map((item, i) => {
		const { name, thumbnail, id, isImg } = item;
		const style = isImg ? { objectFit: 'contain' } : null;
		return (
			<li
				tabIndex={0}
				ref={elem => listRef.current[i] = elem}
				className={'char__item'}
				key={id}
				onFocus={() => {
					onCharacterComics(id)
					listRef.current.forEach(item => { item.classList.remove('char__item_selected') })
					listRef.current[i].classList.add('char__item_selected');
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
