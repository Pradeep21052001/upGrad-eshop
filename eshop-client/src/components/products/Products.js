import React from 'react';
import NavigationBar from '../navigation bar/NavigationBar';
import UserContext, { useUserContext } from '../user cotext/userContext';
import { useHistory } from 'react-router-dom';
import { Card, ToggleButton, CardContent, CardMedia, Typography, Link } from '@mui/material';



export default function ProductsPage({ productList, getProducts }) {
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUserContext();
    const history = useHistory();
    return (
        <div>
            <NavigationBar />
            {isLoggedIn ? (
                <>
                    {/* {productList.map(product => (
                        <h3 key={product.id}>{product.name}</h3>
                    ))} */}
                </>
            ) : (
                history.push('/signIn')
            )}
        </div>
    )

}