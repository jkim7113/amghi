import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { GiSpeaker } from 'react-icons/gi';
import Word from './Word';

const Words = ({ wordData, setWord }) => {

  const audioRef = useRef();
  const { word } = useParams();

  const handleAudioRef = () => {
    audioRef.current.play();
  }

  useEffect(() => {
    setWord(word);
  },[word]);

  return (
    <div id='words-words-container'>
        <Word wordData={wordData} />
    </div>
  )
}

export default Words