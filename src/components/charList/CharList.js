import React, { useId } from "react";

import CharItems from "../charItems/CharItems";
import { useLoadingMarvelData } from "../../hooks/loadingData.hook";

import "./charList.scss";

const CharList = (props) => {
  const { errorMessage, spinner, newItemLoading, onRequest, style, data } =
    useLoadingMarvelData(210, "characters", 9);
  console.log("render charlist");

  return (
    <div className="char__list">
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
