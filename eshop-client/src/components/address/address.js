import React, { useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button, TextField, Grid, Paper } from '@mui/material';
import UserContext, { useUserContext } from '../user cotext/userContext';
import NavigationBar from '../navigation bar/NavigationBar';
import { Link, useHistory } from 'react-router-dom';

export default function Address() {

    const history = useHistory();
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUserContext();
    const [address, setAddress] = useState([]);

    const accessToken = sessionStorage.getItem("accessToken");


    async function getAddress(formData) {
        const response = await fetch("http://localhost:3001/api/v1/addresses")
        const data = response.json();
        setAddress(data);
    }

    return (

        <div>
            <NavigationBar />
            {isLoggedIn ? (
                <>
                 <Link to='/add-address'>
                    <button>Add new address</button>
                 </Link>
                </>
            ) : (
                history.push('/signIn')
            )}
        </div>

    );
}
