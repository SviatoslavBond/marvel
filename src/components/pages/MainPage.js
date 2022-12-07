import React from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

const MainPage = () => {
  const [charSelectedId, setCharId] = React.useState(null);

  const onCharSelected = (id) => {
    setCharId(id);
  };
  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList onCharacterComics={onCharSelected} />
        <ErrorBoundary>
          <CharInfo idChar={charSelectedId} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
