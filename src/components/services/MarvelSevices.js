
class MarvelService {

	_apiKey = 'apikey=b0606c930da7b01f9b1595ded51b5ee8';
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_baseOffset = 210;


	getDate = async (url) => {
		let res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Could not fetch${url} status${res.status}`);
		}
		return await res.json();
	};
	getAllCharacters = async (offset = this._baseOffset) => {
		const res = await this.getDate(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
		return res.data.results.map(item => this._transformCharacter(item));
	}

	getCharacter = async (id) => {
		const response = await this.getDate(`${this._apiBase}characters/${id}?${this._apiKey}`);
		return this._transformCharacter(response.data.results[0]);
	}

	_transformCharacter = (response) => {
		const { name, description, thumbnail, urls, id, comics: { items } } = response;
		const { path, extension } = thumbnail;
		const imgLink = path + '.' + extension;
		const isImg = path.split('/').pop() === 'image_not_available';
		return {
			name,
			description,
			thumbnail: imgLink,
			homepage: urls[0].url,
			wiki: urls[1].url,
			isImg,
			id,
			comics: items,
			active: false
		}
	}
}


export default MarvelService;