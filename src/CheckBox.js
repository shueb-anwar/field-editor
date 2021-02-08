import React from 'react'

export const CheckBox = props => {
    return (
    	<div className="form-element">
            <input readOnly type="checkbox" name="radio-group" id={ 'elem_' + props.value } value={ props.value } checked={ props.isChecked } onClick={ props.handleCheckFieldElement } />
            <label htmlFor={ 'elem_' + props.value }>{ props.value }</label>
        </div>
    )
}

export default CheckBox