import React, { Fragment } from "react";
import NavigationBar from "../navigation bar/NavigationBar";
import { Typography } from '@mui/material';
import './home.css';
import UserContext, { useUserContext } from '../user cotext/userContext';
import { Link, useHistory } from 'react-router-dom';



export default function Home() {
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUserContext();
    return (
        <Fragment>
            <NavigationBar></NavigationBar>

            {!isLoggedIn ? (
                <Typography variant="h3">Please login to continue shopping..!</Typography>
            ) : (
                <div>
                    <Typography variant="h3">Please click the below button to explore the products</Typography>
                    <Link to='/products'>
                        <button>Products</button>
                    </Link>
                </div>
            )}
        </Fragment>

    )
}