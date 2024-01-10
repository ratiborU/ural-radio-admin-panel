// import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
// import Aboutpage from '../pages/Aboutpage';
// import image from "../assets/image 4.svg"
// import image2 from "../assets/image 3.svg"
import Page from './Page';


const setActiveLink = ({isActive}) => isActive ? 'header__group-link header__group-link-active' : 'header__group-link';


const Layout = () => {
  return (
    <div className="wrapper">
      <header className='header'>
        {/* <div className="container"> */}
          <nav className='header__nav'>
            <NavLink className={setActiveLink} to="/issues">Выпуски</NavLink>
            <NavLink className={setActiveLink} to="/reductors">Редакторы</NavLink>
            <NavLink className={setActiveLink} to="/files">Файлы</NavLink>
            
          </nav>
        {/* </div> */}
        
      </header>


      <Page>
        <Outlet/>
      </Page>
      

      <footer className='footer'>
        <div className="footer__text">2023 г. Издательство Уральского университета Россия, 620083, Екатеринбург, ул. Тургенева, 4</div>
      </footer>
    </div>
  );
};

export default Layout;