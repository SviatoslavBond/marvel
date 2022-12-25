
import { Formik, Form, useField, } from 'formik';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import useMarvelService from '../services/MarvelSevices';
import './FindChar.scss'

const FindChar = () => {
	const [char, setChar] = useState('');

	const { getCharacterOnName, error, clearError, onError } = useMarvelService();

	const handleSubmit = (values) => {
		getCharacterOnName(values.char)
			.then(char => setChar(char.name))
			.catch(e => onError())
	}

	const validate = (value) => {
		const errors = {};
		if (!value.char) {
			errors.char = 'This field is required'
		}
		return errors;
	}
	const results =
		error ?
			<p className='error-char--text'>
				The character was not found. Check the name and try again
			</p> : char ?
				<div className='succes-char'>
					<p className='succes-char--text'>
						Success, your character was founded.
						Visit {char} page?
					</p>
					<button type='submit' className="button button__main">
						<div className="inner">
							<Link to={`/char/${char}`}>To page </Link>
						</div>
					</button>
				</div> : null;

	return (
		<div className='char-find'>
			<h4>Or find a character by name:</h4>
			<Formik
				className='char-find'
				initialValues={{
					char: ''
				}}
				validate={validate}
				onSubmit={handleSubmit}
			>
				<Form className="form">
					<div className='char-find--inner'>
						<MyTextInput name='char' placeholder='Enter name' setChar={setChar} clearError={clearError} />
						<button type='submit' className="button button__main ">
							<div className="inner">Find</div>
						</button>
					</div>
					{results}
				</Form>
			</Formik>

		</div >)
}

const MyTextInput = (props) => {
	const { placeholder, } = props;
	const [field, meta] = useField(props);
	const { onChange } = field;

	const handleChange = (e) => {
		if (e.target.value === '') {
			props.setChar('');
			props.clearError();
		}
		onChange(e);
	}
	return (
		<div>
			<input {...field} onChange={handleChange} placeholder={placeholder} />
			{meta.touched && meta.error ? <p className='error-char'>{meta.error}</p> : null}
		</div>
	)
}



export default FindChar;