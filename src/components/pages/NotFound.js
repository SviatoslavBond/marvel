import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../errorMessage/error';
const NotFound = () => {
	const nav = useNavigate()
	return (
		<>
			<ErrorMessage />
			<h2>Page not found</h2>
			{/* <Link to="/">Go to homepage</Link> */}
			<button onClick={() => nav(-1)} className="button button__main">
				<div className="inner">Go to homepage</div>
			</button>

		</>
	)
}

export default NotFound;