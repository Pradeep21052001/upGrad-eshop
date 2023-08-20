import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavigationBar from "../navigation bar/NavigationBar";
import './modifyProduct.css';



export default function ModifyProduct({modifyHandler}) {

    const { productid } = useParams();
    const [modifyForm, setModifyForm] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        manufacturer: '',
        availableItems: '',
        imageURL: ''
    });

    useEffect(() => {
        async function getProductById() {
            try {
                const response = await fetch(`http://localhost:3001/api/v1/products/${productid}`);
                const data = await response.json();
                setModifyForm(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
        getProductById();
    }, [productid]);
    const inputChangedHandler = (e) => {
        const state = modifyForm;
        state[e.target.name] = e.target.value;
        setModifyForm({ ...state });
    }

    const modifyProductSubmitted = (e) => {
        e.preventDefault();
        modifyHandler(modifyForm,productid);
    }



    const { name, category, price, description, manufacturer, availableItems, imageURL } = modifyForm;



    return (
        <div>
            <NavigationBar ></NavigationBar> <br></br> <br></br> 
            <div className='modifyProductsForm'>
                <form onSubmit={modifyProductSubmitted}>
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
        </div>

    )
}