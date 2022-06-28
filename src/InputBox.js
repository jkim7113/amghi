import React from 'react'

const InputBox = ({ state, index, setState }) => {

  const onChangeHandler = (e) => {
        e.target.value = e.target.value.replace('`', '');
  }

  return (
    <li className='add-form-def-lis'>
      <input value={state} onChange={(e) => {
        onChangeHandler(e); 
        setState(state => 
          [
            ...state.slice(0, index),
            e.target.value,
            ...state.slice(index + 1),
          ]
        );
        }} className='add-form-defs' type='text' autoComplete='off' spellCheck='false'/>
    </li>
  )
}

export default InputBox