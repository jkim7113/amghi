import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import About from './Login';
import Navbar from './Navbar';
import Library from './Library';
import Words from './Words';
import Error from './Error';
import { useState, useEffect } from 'react';

function App() {
  const [ word, setWord ] = useState('');
  const [ wordData, setWordData ] = useState([]);
  const [ keyword, setKeyword ] = useState('');
  const [ relatedKeywords, setRelatedKeywords ] = useState([]);
  const [ verified, setVerified ] = useState(true);
  const abortController = new AbortController();

  useEffect(() => {

    if(keyword == ''){
      setRelatedKeywords([])
    } else {
      fetch(`http://localhost:4000/search/${keyword}`,
      { signal: abortController.signal })
        .then(response => response.json())
        .then(data => {
          setRelatedKeywords(data.results.words);
        })
        .catch(err => {
          console.error(err);
          setRelatedKeywords([]);
      });
    };

  },[keyword]);

  useEffect(() => {

    if(word !== ''){ 
      fetch(`http://localhost:4000/words/${word}`,
        { signal: abortController.signal })
          .then(response => response.json())
          .then(data => {
            setWordData(data);
          })
          .catch(err => {
            console.error(err);
            setWordData([]);
        });
    }
  },[word]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar verified={verified}
          wordData={wordData}
          setWordData={setWordData}
          setKeyword={setKeyword} 
          abortController={abortController}
          relatedKeywords={relatedKeywords} 
        />
        <Routes>
          <Route path='/' element={<Navigate to='/library'/>}/>
          <Route path='/login' element={<About />}/>
          <Route path='/library' element={<Library wordData={wordData} setWord={setWord} setWordData={setWordData}/>} />
          <Route path='/words/:word' element={<Words wordData={wordData} setWord={setWord} />}/>
          <Route path='*' element={<Error type={404}/>}/>
        </Routes>
      </BrowserRouter>
      {
        word == '' ? '' :
        <div id='background' onClick={() => setKeyword('')}></div>
      }
    </div>
  );
}

export default App;
