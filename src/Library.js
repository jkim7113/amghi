import {React, useEffect } from 'react';
import Word from './Word';

const Library = ({ wordData, setWordData }) => {

  useEffect(() => {
    fetch(`http://localhost:4000/words`)
          .then(response => {
            response.json()
            .then(json => {
              setWordData(json.words);
            });
          })
          .catch(err => {
            console.error(err);
            setWordData([]);
          });
  }, []);

  return (
    <div>
        <Word wordData={wordData} />
    </div>
  )
}

export default Library