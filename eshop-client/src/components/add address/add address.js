import React, { useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button, TextField, Grid, Paper } from '@mui/material';
import UserContext, { useUserContext } from '../user cotext/userContext';
import NavigationBar from '../navigation bar/NavigationBar';
import { useHistory } from 'react-router-dom';

export default function AddAddress() {

    const history = useHistory();
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUserContext();
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        city: '',
        landmark: '',
        street: '',
        state: '',
        zipCode: '',
    });

    const accessToken = sessionStorage.getItem("accessToken");
    const handleSubmit = (event) => {
        event.preventDefault();
        addAddress(formData);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    async function addAddress(formData) {
        await fetch("http://localhost:3001/api/v1/addresses",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": accessToken
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                history.push('/address');
            })
            .catch(error => {
                alert(error);
            });
    }

    return (

        <div>
            <NavigationBar /> <br></br> 
            {isLoggedIn ? (
                <>
                    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
                        <ValidatorForm onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextValidator
                                        label="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextValidator
                                        label="Contact Number"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleInputChange}
                                        validators={['required', 'isNumber']}
                                        errorMessages={['This field is required', 'Invalid contact number']}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextValidator
                                        label="City"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Landmark"
                                        name="landmark"
                                        value={formData.landmark}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextValidator
                                        label="Street"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleInputChange}
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextValidator
                                        label="State"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextValidator
                                        label="ZIP Code"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        validators={['required', 'isNumber']}
                                        errorMessages={['This field is required', 'Invalid ZIP code']}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </Paper>
                </>
            ) : (
                history.push('/signIn')
            )}
        </div>

    );
}
