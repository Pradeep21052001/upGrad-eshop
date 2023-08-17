import React, { useState } from 'react';
import NavigationBar from '../navigation bar/NavigationBar';
import './add products.css';
import UserContext, { useUserContext } from '../user cotext/userContext';
import { useHistory } from 'react-router-dom';



export default function AddProducts({ addProduct }) {

    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUserContext();
    const history = useHistory();

    const [addProductsForm, setAddProductsForm] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        manufacturer: '',
        availableItems: '', 
        imageURL: ''
    });


    const inputChangedHandler = (e) => {
        const state = addProductsForm;
        state[e.target.name] = e.target.value;
        setAddProductsForm({ ...state });
    }

    const addProductSubmitted = (e) => {
        e.preventDefault();
        addProduct(addProductsForm);
    }

    const { name, category, price, description, manufacturer, availableItems, imageURL } = addProductsForm;

    return (

        <div>
            <NavigationBar ></NavigationBar>
            {isLoggedIn && isAdmin && (
                <div className='addProductsForm'>
                <form onSubmit={addProductSubmitted}>
                    <input type='text' className='input' name='name' value={name} label='Product name' onChange={inputChangedHandler} required placeholder='Enter product Name'></input>
                    <input type='text' className='input' name='category' value={category} label='Product category' onChange={inputChangedHandler} required placeholder='Enter product category'></input>
                    <input type='text' className='input' name='price' value={price} label='Product price' onChange={inputChangedHandler} required placeholder='Enter price'></input>
                    <input type='text' className='input' name='description' value={description} label='Product description' onChange={inputChangedHandler} placeholder='Enter description'></input>
                    <input type='text' className='input' name='manufacturer' value={manufacturer} label='Manufacturer name' onChange={inputChangedHandler} placeholder='Enter manufacturer name'></input>
                    <input type='number' className='input' name='availableItems' value={availableItems} label='Available items' onChange={inputChangedHandler} required placeholder='Enter available Items'></input>
                    <input type='text' className='input' name='imageURL' value={imageURL} label='Image URL' onChange={inputChangedHandler} placeholder='Enter image URL'></input>
                    <button className='submit-button' type="submit">Submit</button>
                </form> 
            </div>  
            ) }
            {isLoggedIn && !isAdmin && (
                history.push('/products')
            )
            }
            {!isLoggedIn && (
                history.push('/signIn')
            )}
        </div>
    )
}