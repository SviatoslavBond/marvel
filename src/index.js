import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';


// const marvelService = new MarvelService(5, 210);
// marvelService.getAllCharacters()
// 	.then(response => {

// 		console.log(response)
// 	})
const root = ReactDOM.createRoot(
	document.getElementById('root')
);

root.render(
	<App />
);


