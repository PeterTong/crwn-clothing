import React from 'react';

import './form-input.styles.scss';


// when we write JS in JSX, we enclose it with {}

// when we write JSX in JS, we enclose it with ()
const FormInput = ({ handleChange, label, ...otherProps }) => (
	<div className='group'>
		<input className='form-input' onChange={handleChange} {...otherProps}/>

		{label ? (
			<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
			{label}
			</label>
		) : null} 
	</div>
);

export default FormInput;