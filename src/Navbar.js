import React, { useRef } from 'react';
import { AiOutlineUser, AiFillFolder } from 'react-icons/ai'
import { SiWritedotas } from 'react-icons/si'
import { NavLink } from 'react-router-dom';
import AutoComplete from './AutoComplete';
import Add from './Add';

const Navbar = ({ verified, wordData, setWordData, setKeyword, abortController, relatedKeywords }) => {
  const modal = useRef();

  const lockScroll = () => {
    document.querySelector('body').style.overflowY = 'hidden';
  }

  const openModal = () => {
    modal.current.style.display = 'block';
  }
  
  return (
    <>
    <Add wordData={wordData} setWordData={setWordData} modal={modal}/>
    <nav>
      <div id='nav-container'>
      <NavLink to='/'><img src='/images/banner-logo-bc.png' id='title' /></NavLink>
      <AutoComplete setKeyword={setKeyword} 
          abortController={abortController} 
          relatedKeywords={relatedKeywords}
        />
        <div onClick={() => setKeyword('')} id='left-container'>
            {
              verified == true ? 
              <>
              <a onClick={() => {openModal(); lockScroll();}}><SiWritedotas className='link' size={30} style={{color:'white'}}/></a>
              <NavLink to='/library'><AiFillFolder className='link' size={30} style={{color:'white'}}/></NavLink>
              </>
              
              : 
              <>
                <NavLink to='/login'><AiOutlineUser id='user-icon' size={30} style={{fill:'white'}}/></NavLink>
              </>
            }
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar