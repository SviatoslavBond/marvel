import React from "react";
import { useLoadingMarvelData } from "../../hooks/loadingData.hook";
import "./comicsList.scss";

const ComicsList = () => {
  const { errorMessage, spinner, newItemLoading, onRequest, style, data } =
    useLoadingMarvelData(10, "comics", 8);

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
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};
const View = ({ data }) => {
  const comics = data.map((item, i) => {
    const { title, price, imgLink, url } = item;
    return (
      <li key={i} className="comics__item">
        <a href={url} target={"_blank"}>
          <img src={imgLink} alt="ultimate war" className="comics__item-img" />
          <div className="comics__item-name">{title}</div>
          <div className="comics__item-price">{price}</div>
        </a>
      </li>
    );
  });
  return <ul className="comics__grid">{comics}</ul>;
};

export default ComicsList;
