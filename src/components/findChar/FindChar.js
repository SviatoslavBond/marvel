
import { Formik, Form, useField } from 'formik';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import useMarvelService from '../services/MarvelSevices';
import './FindChar.scss'


const FindChar = () => {
	const [isCharacter, setIsCharacter] = useState('');
	const [error, setError] = useState(false);

	const { getCharacterOnName } = useMarvelService();

	const onError = () => {
		setIsCharacter('');
		setError(true);
	}
	const onSuccess = (char) => {
		setIsCharacter(char.name);
		setError(false);
	}

	const handleSubmit = (values) => {
		getCharacterOnName(values.char)
			.then(char => onSuccess(char))
			.catch(e => onError())
	}

	const validate = (value) => {
		const errors = {};
		if (!value.char) {
			errors.char = 'This field is required'
		}
		return errors;
	}

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

						<MyTextInput
							name='char'
							placeholder='Enter name'
							setIsCharacter={setIsCharacter}
							setError={setError} />

						<button type='submit' className="button button__main ">
							<div className="inner">Find</div>
						</button>
					</div>
					{error ? <NotFound /> : isCharacter ? <StatusOk char={isCharacter} /> : null}
				</Form>

			</Formik>
		</div >)
}
const MyTextInput = (props) => {
	const { placeholder, } = props;
	const [field, meta] = useField(props);
	const { name, value, onChange, onBlur } = field;

	const handleChange = (e) => {
		if (e.target.value === '') {
			props.setIsCharacter('');
			props.setError(false);
		}
		onChange(e);
	}
	return (
		<div>
			<input onBlur={onBlur} value={value} name={name} onChange={handleChange} placeholder={placeholder} />
			{meta.touched && meta.error ? <p className='error-char'>{meta.error}</p> : null}
		</div>
	)
}
const StatusOk = ({ char }) => {

	return (
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
		</div>
	)
}
const NotFound = () => {

	return (
		<div className='error-char'>
			<p className='error-char--text'>
				The character was not found. Check the name and try again
			</p>
		</div>
	)
}

export default FindChar;