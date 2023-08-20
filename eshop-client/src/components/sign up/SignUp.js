import React, { Fragment, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import NavigationBar from '../navigation bar/NavigationBar.js';
import './SignUp.css';

export default function SignUp({ registerDetails }) {

    const [detailsForm, setDetailsForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        contactNumber: ''
    });

    const inputChangedHandler = (e) => {
        const state = detailsForm;
        state[e.target.name] = e.target.value;
        setDetailsForm({ ...state });
    }

    const formSubmitted = (e) => {
        e.preventDefault();
        registerDetails(detailsForm);
    }

    const { firstName, lastName, email, password, role, contactNumber } = detailsForm;
    return (
        <Fragment>
            <NavigationBar ></NavigationBar>  <br></br> <br></br>
            <div className='signUpForm'>
                <ValidatorForm onSubmit={formSubmitted} >
                    <div className='form-field'>
                        <TextValidator
                            label="Enter Firstname"
                            type='text'
                            name="firstName"
                            value={firstName}
                            onChange={inputChangedHandler}
                            validators={['required']}
                            errorMessages={['Firstname cannot be empty']}
                            className="textValidator"
                        >
                        </TextValidator>
                    </div>

                    <div className='form-field'>
                        <TextValidator
                            label="Enter Lastname"
                            type='text'
                            name="lastName"
                            value={lastName}
                            onChange={inputChangedHandler}
                            validators={['required']}
                            errorMessages={['Lastname cannot be empty']}
                            className="textValidator"
                        >
                        </TextValidator>
                    </div>

                    <div className='form-field'>
                        <TextValidator
                            id='email'
                            label="Enter email"
                            type='email'
                            name="email"
                            value={email}
                            onChange={inputChangedHandler}
                            validators={['required']}
                            errorMessages={['E-mail cannot be empty']}
                            className="textValidator"
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
                            className="textValidator"
                        >
                        </TextValidator>
                    </div>
                
                    <div className='form-field'>
                        <select 
                        name='role'
                        value={role} 
                        onChange={inputChangedHandler}
                        className="textValidator"
                        id='selectRole'
                        >
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>

                    <div className='form-field'>
                        <TextValidator
                            label="Enter contact number"
                            type="number"
                            name="contactNumber"
                            value={contactNumber}
                            onChange={inputChangedHandler}
                            className="textValidator"
                        >
                        </TextValidator>
                    </div>

                    <button className='submit' type="submit">Submit</button>
                </ValidatorForm>
            </div>
        </Fragment>
    );
}