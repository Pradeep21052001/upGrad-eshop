import React from 'react';
import './NavigationBar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import { Link, useHistory } from 'react-router-dom';
import UserContext, { useUserContext } from '../user cotext/userContext';
import { Typography } from '@mui/material';

export default function NavigationBar() {

  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUserContext();
  const history = useHistory();

  function logoutClicked() {
    setIsLoggedIn(false);
    setIsAdmin(false);
    sessionStorage.removeItem('accessToken');
    history.push('/signIn');
  }

  return (
    <AppBar className='appBar'>
      <ToolBar className='toolBar'>
        <span className='eshop-logo'>
          <ShoppingCartIcon />
          <span className='eshop-text'>upGrad 
          eshop</span>
        </span>
        {!isLoggedIn ? (
          <div className='auth-buttons'>
            <Link to="/signIn">
              <button className='auth-button'>Log In</button>
            </Link>
            <Link to="/signUp">
              <button className='auth-button'>Sign Up</button>
            </Link>
          </div>
        ) : (
          <div className='auth-buttons'>
            <input className='searchBox' type="text" placeholder="Search" />
            <Link to="/">
              <button className='auth-button'>Home</button>
            </Link>
            {isAdmin && <Link to="/add-products">
              <button className='add-products'>Add Products</button>
            </Link>}
            <Link to="/">
              <button className='auth-button' onClick={logoutClicked}>Log out</button>
            </Link>
          </div>
        )}
      </ToolBar>
    </AppBar>
  );
}
