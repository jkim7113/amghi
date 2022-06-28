import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const AutoComplete = ({ setKeyword, abortController, relatedKeywords = [] }) => {
  let debounce = null;

  const onChangeHandler = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z,0123456789 ]/ig, '');
    clearTimeout(debounce);
    abortController.abort();
    debounce = setTimeout(() => {
      setKeyword(e.target.value);
    }, 500);
  }

  return (
    <div id='right-container'>
            <AiOutlineSearch id='search-icon' size='21px'/>
            <input onClick={(e) => setKeyword(e.target.value)} onChange={(e) => onChangeHandler(e)} id='nav-search-bar' spellCheck='false' type='text' autoCapitalize='off' autoComplete='off' placeholder='Search for a word'></input>
            <div id='keywords-container'>
              { 
                relatedKeywords.map(keyword => 

                    <Link to={'/words/' + keyword.id} 
                      onClick={() => setKeyword('')} 
                      className='keywords'
                      key={keyword.id}>
                        {keyword.word}
                    </Link>

                )
              }
            </div>
    </div>
  )
}

export default AutoComplete