import React, { useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const CharItems = ({ data, onCharacterComics }) => {
	const listRef = useRef([]);

	return (
		<ul className="char__grid">
			<TransitionGroup component={null}>
				{data.map(({ name, thumbnail, id, isImg }, i) => {
					return (
						<CSSTransition
							key={id}
							classNames='cardItem'
							timeout={500}	>
							<li
								tabIndex={0}
								ref={elem => listRef.current[i] = elem}
								className={'char__item'}
								key={id}
								onFocus={() => {
									onCharacterComics(id)
									listRef.current.forEach(item => { item.classList.remove('char__item_selected') })
									listRef.current[i].classList.add('char__item_selected');
								}}>
								<img src={thumbnail} alt={name} style={isImg ? { objectFit: 'contain' } : null} />
								<div className="char__name">{name}</div>
							</li>
						</CSSTransition>
					)
				}
				)}
			</TransitionGroup>
		</ul>
	)

}

export default CharItems;
