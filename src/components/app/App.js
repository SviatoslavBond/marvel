import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/Comics";
import NotFound from "../pages/NotFound";
import SingleComic from "../singleComic/SingleComic";

const App = () => {
	console.log("render");
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/comics" element={<ComicsPage />} />
						<Route path="/comics/:id" element={<SingleComic />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
