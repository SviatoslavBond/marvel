import { useHttp } from "../../hooks/http.hook";

const useMarvelService = () => {
	const { loading, request, error, clearError, setLoading } = useHttp();

	const _apiKey = "apikey=b0606c930da7b01f9b1595ded51b5ee8";
	const _apiBase = "https://gateway.marvel.com:443/v1/public/";
	const _baseOffset = 210;
	const _comicsOffset = 10;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map((item) => _transformCharacter(item));
	};
	const getComics = async (offset = _comicsOffset) => {
		const res = await request(
			`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map((item) => _transformComics(item));
	};
	const getSingleComics = async (id) => {
		const res = await request(
			`${_apiBase}comics/${id}?${_apiKey}`
		);
		return _transformSingleComics(res.data.results[0]);
	};

	const getCharacter = async (id) => {
		const response = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(response.data.results[0]);
	};

	const _transformCharacter = (response) => {
		const {
			name,
			description,
			thumbnail,
			urls,
			id,
			comics: { items },
		} = response;
		const { path, extension } = thumbnail;
		const imgLink = path + "." + extension;
		const isImg = path.split("/").pop() === "image_not_available";
		return {
			name,
			description,
			thumbnail: imgLink,
			homepage: urls[0].url,
			wiki: urls[1].url,
			isImg,
			id,
			comics: items,
			active: false,
		};
	};

	const _transformComics = (response) => {
		const { id, title, thumbnail: { path, extension }, prices, urls } = response;
		const imgLink = path + "." + extension;
		return {
			id,
			title,
			price: prices[0].price,
			imgLink,
			url: urls[0].url,
		};
	};
	const _transformSingleComics = (response) => {
		const { id, title, thumbnail: { path, extension }, prices, urls, pageCount, textObjects } = response;
		const imgLink = path + "." + extension;
		return {
			id,
			title,
			price: prices[0].price,
			imgLink,
			url: urls[0].url,
			pageCount,
			descr: textObjects[0].text || 'not description',
			language: textObjects[0].language,
		};

	}
	return {
		loading,
		error,
		getCharacter,
		getAllCharacters,
		clearError,
		getComics,
		setLoading,
		getSingleComics
	};
};

export default useMarvelService;
