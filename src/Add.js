import React, { useRef, useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import InputBox from './InputBox';

const Add = ({ wordData, setWordData, modal }) => { 
  const word = useRef();
  const pof = useRef();
  const [ defs, setDefs ] = useState(['']);
  const [ examples, setExamples ] = useState(['']);

  const unlockScroll = () => {
    document.querySelector('body').style.overflowY = 'scroll';
  } 

  const closeModal = () => {
    modal.current.style.display = 'none';
  }

  const addDefinition = () => {
    setDefs(defs => [...defs, '']);
  }

  const deleteDefinition = () => {
    setDefs(defs.length !== 1 ? defs.slice(0,-1) : defs);
  }

  const addExample = () => {
    setExamples(examples => [...examples, '']);
  }

  const deleteExample = () => {
    setExamples(examples.length !== 1 ? examples.slice(0,-1) : examples);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/words`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word: word.current.value,
        pof: pof.current.value,
        definitions: defs, //Array.from(definitions.current.children).map(li => li.children[0].value),
        examples: examples,
      }),
    }).then(res => {
      if(res.status === 200){
        console.log(wordData);
        const date = new Date();
        setWordData([...wordData, { word: word.current.value, pof: pof.current.value, defs: defs.join('`'), examples: examples.join('`'), date: String(date).slice(11,24),}]);
        word.current.value = '';
        setDefs(['']);
        setExamples(['']);
        closeModal();
        unlockScroll();
      }
    })
  }

  return (
    <div id='modal' ref={modal}>
    <div id='add-form-background' onClick={() => {closeModal(); unlockScroll();}}></div>
    <form id='add-form' onSubmit={(e) => onSubmitHandler(e)}>
      <div id='add-form-header'>
        <h2 id='add-form-title'>Add a new word</h2>
        < VscChromeClose onClick={() => {closeModal(); unlockScroll();}} size='27px' />
      </div>
        <div id='add-form-select-box'>
          <input id='add-form-word' type='text' ref={word} autoComplete='off' spellCheck='false' placeholder='Type your word here' />
          <select onChange={(e) => console.log(pof.current.value)} id='add-form-pof' ref={pof}>
            <option value='noun'>noun</option>
            <option value='verb'>verb</option>
            <option value='adverb'>adverb</option>
            <option value='adjective'>adjective</option>
            <option value='pronoun'>pronoun</option>
            <option value='preposition'>preposition</option>
            <option value='conjuction'>conjuction</option>
            <option value='interjection'>interjection</option>
            <option value='others'>others</option>
          </select>
        </div>
        <div id='add-form-scroll-box'>
          <span className='add-form-input-header'><h3 className='add-form-input-title'>Definitions</h3><button onClick={addDefinition} type='button' className='add-form-add-btn'>Add</button><button onClick={deleteDefinition} type='button' className='add-form-delete-btn'>Delete</button></span>
          <ul>
            {
              defs.map((def, index) => (
                <InputBox key={index} setState={setDefs} state={def} index={index}/>
              ))
            }
          </ul>
          <span className='add-form-input-header'><h3 className='add-form-input-title'>Examples</h3><button onClick={addExample} type='button' className='add-form-add-btn'>Add</button><button onClick={deleteExample} type='button' className='add-form-delete-btn'>Delete</button></span>
          <ul>
            {
              examples.map((example, index) => (
                <InputBox key={index} setState={setExamples} state={example} index={index}/>
              ))
            }
          </ul>
        </div>
        <button id='add-form-submit' type='submit'>Submit</button>
    </form>
    </div>
  )
}

export default Add