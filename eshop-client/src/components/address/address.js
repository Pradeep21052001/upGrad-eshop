import React, { useEffect, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button, TextField, Grid, Paper } from '@mui/material';
import UserContext, { useUserContext } from '../user cotext/userContext';
import NavigationBar from '../navigation bar/NavigationBar';
import { Link, useHistory } from 'react-router-dom';
import { Card, CardContent, Typography, Radio } from '@mui/material';
import AddAddress from '../add address/add address';

export default function Address() {

    const [addresses, setAddresses] = useState([]);
    const history = useHistory();
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUserContext();

    const [selectedAddress, setSelectedAddress] = useState(null);
    const accessToken = sessionStorage.getItem("accessToken");


    async function getAddress() {
        const response = await fetch("http://localhost:3001/api/v1/addresses", {
            method: "GET",
            headers: {
                "x-auth-token": accessToken
            },
        })
        const data = await response.json();
        setAddresses(data);
    }

    useEffect(() => {
        getAddress();
    }, [addresses])

    const handleAddressChange = (event) => {
        setSelectedAddress(event.target.value);
    };

    function addressSelected() {

    }

    return (
        <div>
            <NavigationBar />
            {isLoggedIn && addresses ? (
                <div>
                    <div>
                        <h2>Addresses</h2>
                        <ValidatorForm>
                            {addresses.map((address) => (
                                <div>
                                    <Card key={address._id} variant="outlined" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <CardContent style={{ flex: 1 }}>
                                            <Radio
                                                value={address._id}
                                                name="address-radio"
                                                // checked={selectedAddress === address._id}
                                                onChange={handleAddressChange}
                                            />
                                        </CardContent>
                                        <CardContent style={{ flex: 30 }}>
                                            <Typography variant="h6">{address.name}</Typography>
                                            <Typography variant="body2">{address.landmark}</Typography>
                                            <Typography variant="body2">{address.street}</Typography>
                                            <Typography variant="body2">{address.city}</Typography>
                                            <Typography variant="body2">{address.state}</Typography>
                                            <Typography variant="body2">{address.zipCode}</Typography>
                                            <Typography variant="body2">{address.contactNumber}</Typography>
                                        </CardContent>
                                    </Card>
                                    <button onClick={() => addressSelected(address.id)}>Proceed</button>
                                </div>

                            ))}
                        </ValidatorForm>
                    </div>
                    <Link to='add-address'>
                        <button>Add new address</button>
                    </Link>

                </div>
            ) : (
                history.push('/signIn')
            )}
        </div>)
}
