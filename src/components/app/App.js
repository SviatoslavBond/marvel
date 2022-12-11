import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
// import MainPage from "../pages/MainPage";
// import ComicsPage from "../pages/Comics";
// import SingleComic from "../singleComic/SingleComic";
import Spiner from "../spinner/spiner";
const NotFound = React.lazy(() => import("../pages/NotFound"));
const MainPage = React.lazy(() => import("../pages/MainPage"));
const ComicsPage = React.lazy(() => import("../pages/Comics"));
const SingleComic = React.lazy(() => import("../singleComic/SingleComic"));

const App = () => {
	console.log("render");
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Suspense fallback={<Spiner />}>
						<Routes>
							<Route path="/" element={<MainPage />} />
							<Route path="/comics" element={<ComicsPage />} />
							<Route path="/comics/:id" element={<SingleComic />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	);
};

export default App;
