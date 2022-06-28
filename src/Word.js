import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { GiSpeaker } from 'react-icons/gi';

const Word = ({ wordData }) => {

  const audioRef = useRef();
  const { word } = useParams();

  const handleAudioRef = () => {
    audioRef.current.play();
  }

  return (
    <div id="word-words-container">
      {
        wordData ? wordData.map((result,index) => (
          <div key={index} className='word-container'>

          <h2 className='words'>{result.word} <i className='pofs'>{result.pof}</i></h2>

          {/* <div className='pronunciations'>
            <GiSpeaker className='speaker-icons' size='22px' onClick={() => handleAudioRef()} />
            <p className='phonetic-spellings'>{
              result.pronunciation.hw == undefined ? `Couldn't find its phonetic spelling :/`
              : result.pronunciation.hw}
            </p>   
          </div> 
    
          <audio ref={audioRef} controls>
            <source src={result.pronunciation.audio} type='audio/mpeg'></source>
          </audio> */}
          <ul className="defs-container">{
           result.defs.split('`').map((def, index) => (
            <li className="defs" key={index}>{def}</li>
           ))
          }</ul>

          <ul className="defs-container">{
            result.examples !== '' ? 
           result.examples.split('`').map((example, index) => (
            <li className="examples" key={index}>"{example}"</li>
           )) : ''
          }</ul>

          <span className='date'><p style={{margin:0}}>Created at {result.date.substr(0,16)}</p></span>
          </div>
        ))
        : ''
      }
      </div>
  )
}

export default Word