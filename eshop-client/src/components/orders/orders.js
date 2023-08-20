import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Stepper, Step, StepLabel, Radio } from '@mui/material';
import UserContext, { useUserContext } from '../user cotext/userContext';
import { Link, useHistory } from "react-router-dom";
import NavigationBar from "../navigation bar/NavigationBar";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './orders.css';


export default function Orders() {

    const history = useHistory();
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUserContext();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const accessToken = sessionStorage.getItem("accessToken");
    const [activeStep, setActiveStep] = useState(1);
    const steps = ['Product', 'Address', 'Place Order'];


    const userId = sessionStorage.getItem("userId");
    const qty = sessionStorage.getItem("qty");
    const productId = sessionStorage.getItem("productId");



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
    }, [])

    const handleAddressChange = (event) => {
        setSelectedAddress(event.target.value);
    };

    function addressSelected() {
        const selectedAddressObj = addresses.find(address => address._id === selectedAddress);

        if (selectedAddressObj) {
            placeOrder(selectedAddressObj._id);
        }
    }


    async function placeOrder(addressId) {
        const dataToPass = {
            address: addressId,  // ObjectId of the address associated with the order
            user: userId,        // ObjectId of the user placing the order
            product: productId,  // ObjectId of the product being ordered
            quantity: qty
        }

        await fetch('http://localhost:3001/api/v1/orders', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": accessToken
            },
            body: JSON.stringify(dataToPass)
        })
            .then(data => {
                history.push('/order-confirm');
            })
            .catch(error => {
                alert(error);
            })
    }

    return (
        <div >
            {isLoggedIn ? (
                <div><NavigationBar />
                    <div className="page-container">
                        <div className="whole-container">
                            <Stepper
                                activeStep={activeStep}
                                alternativeLabel
                                className="stepper"
                            >
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>

                        <div>
                            <h2>Select Address</h2>
                            {addresses.map((address) => (
                                <div key={address._id}>
                                    <Card
                                        variant="outlined"
                                        className="card"
                                    >
                                        <CardContent className="cardContent">
                                            <Radio
                                                value={address._id}
                                                name="address-radio"
                                                checked={selectedAddress === address._id}
                                                onChange={handleAddressChange}
                                                className="radio"
                                            />
                                        </CardContent>
                                        <CardContent className="cardContent">
                                            <Typography variant="h6">{address.name}</Typography>
                                            <Typography variant="body2">{address.landmark}</Typography>
                                            <Typography variant="body2">{address.street}</Typography>
                                            <Typography variant="body2">{address.city}</Typography>
                                            <Typography variant="body2">{address.state}</Typography>
                                            <Typography variant="body2">{address.zipCode}</Typography>
                                            <Typography variant="body2">{address.contactNumber}</Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                            <div className="bothButtons">
                                <div>
                                    <button onClick={addressSelected} className="confirmButton">
                                        Confirm order
                                    </button> 
                                </div>
                                <Link to="add-address">
                                    <button className="addAddressButton">Add new address</button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                history.push("/signIn")
            )}
        </div>
    );
}
