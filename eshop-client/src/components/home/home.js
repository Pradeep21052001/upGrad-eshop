import React, { Fragment } from "react";
import NavigationBar from "../navigation bar/NavigationBar";
import { Typography } from '@mui/material';
import './home.css';
import UserContext, { useUserContext } from '../user cotext/userContext';
import { Link, useHistory } from 'react-router-dom';



export default function Home() {
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUserContext();
    return (
        <div>
            <NavigationBar></NavigationBar>
            <div className='wholePage'>
                {!isLoggedIn ? (
                    <Typography variant="h3" className='home-text'>Please login to continue shopping..!</Typography>
                ) : (
                    <div className='home-text'>
                        <Typography variant="h3">Please click the below button to explore the products..!</Typography> <br></br>
                        <Link to='/products'>
                            <button className='products-btn'>Products</button>
                        </Link>
                    </div>
                )}
            </div>

        </div>

    )
}