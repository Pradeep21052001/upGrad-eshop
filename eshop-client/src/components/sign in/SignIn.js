import React, { Fragment, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import UserContext, { useUserContext } from '../user cotext/userContext';
import NavigationBar from '../navigation bar/NavigationBar';
import './SignIn.css';

export default function SignIn({ checkCredentials }) {

    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUserContext();

    const [credentialsForm, setcredentialsForm] = useState({
        email: '',
        password: ''
    });

    const inputChangedHandler = (e) => {
        const state = credentialsForm;
        state[e.target.name] = e.target.value;
        setcredentialsForm({ ...state });
    }

    const formSubmitted = (e) => {
        e.preventDefault();
        checkCredentials(credentialsForm);
    }

    const { email, password } = credentialsForm;
    return (
        <Fragment>
            <NavigationBar></NavigationBar>  <br></br> <br></br>
            <div className='signInForm'>
                <ValidatorForm onSubmit={formSubmitted}>
                    <div className='form-field'>
                        <TextValidator
                            id='email'
                            label="Enter email"
                            type='text'
                            name="email"
                            value={email}
                            onChange={inputChangedHandler}
                            validators={['required']}
                            errorMessages={['Name cannot be empty']}
                        >
                        </TextValidator>
                    </div>

                    <div className='form-field'>
                        <TextValidator
                            id='password'
                            label="Enter password"
                            type='password'
                            name="password"
                            value={password}
                            onChange={inputChangedHandler}
                            validators={['required']}
                            errorMessages={['Password cannot be empty']}
                        ></TextValidator>
                    </div>
                    <button className='submit' type="submit">Submit</button>
                </ValidatorForm>
            </div>
        </Fragment>
    );
}