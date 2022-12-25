import React from "react";
import { useLoadingMarvelData } from "../../hooks/loadingData.hook";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./comicsList.scss";

const ComicsList = () => {
	const { errorMessage, spinner, newItemLoading, onRequest, style, data } = useLoadingMarvelData(10, "comics", 8);

	return (
		<div className="comics__list">
			{/* {console.log("return jsx")} */}
			{errorMessage}
			{spinner}
			<View data={data} />
			<button
				onClick={() => onRequest()}
				disabled={newItemLoading}
				style={style}
				className="button button__main button__long">
				<div className="inner">load more</div>
			</button>
		</div>
	);
};
const View = ({ data }) => {
	return <ul className="comics__grid">{
		<TransitionGroup component={null}>
			{
				data.map((item, i) => {
					const { title, price, imgLink, id } = item;

					return (
						<CSSTransition
							key={id}
							classNames='comicsItem'
							timeout={500}
						>
							<li key={i} className="comics__item">
								<Link to={`/comics/${id}`}>
									<img src={imgLink} alt="ultimate war" className="comics__item-img" />
									<div className="comics__item-name">{title}</div>
									<div className="comics__item-price">{price}</div>
								</Link>
							</li>
						</CSSTransition>
					)
				})
			}
		</TransitionGroup>
	}</ul>;
};

export default ComicsList;
