import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Stepper, Step, StepLabel } from '@mui/material';
import './orders.css';
import UserContext, { useUserContext } from '../user cotext/userContext';
import { Link, useHistory } from "react-router-dom";
import NavigationBar from "../navigation bar/NavigationBar";

export default function Orders() {

    const history = useHistory();
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUserContext();
    const accessToken = sessionStorage.getItem("accessToken");
    const [activeStep, setActiveStep] = useState(1); // Set to 1 to start at the second step
    const steps = ['Product', 'Address', 'Place Order'];
    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <NavigationBar></NavigationBar>
                    <div> <Stepper activeStep={activeStep} alternativeLabel className='stepper'>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                        <Link to='/address'>
                            <button>Select Address</button>
                        </Link>
                    </div>
                </div>

            ) : (
                history.push('/signIn')
            )
            }
        </div>
    )
}