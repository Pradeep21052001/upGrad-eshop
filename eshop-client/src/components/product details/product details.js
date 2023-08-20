import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './product details.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Orders from '../orders/orders';
import UserContext, { useUserContext } from '../user cotext/userContext';
import NavigationBar from '../navigation bar/NavigationBar';

export default function ProductDetails() {

    const history = useHistory();
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(0);
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUserContext();

    function inputChangedHandler(e) {
        setQty(e.target.value);
    }

    useEffect(() => {
        async function getProductById() {
            try {
                const response = await fetch(`http://localhost:3001/api/v1/products/${productId}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }

        getProductById();
    }, [productId]);


    

    function orderClicked() {
        sessionStorage.setItem("qty", qty);
        sessionStorage.setItem("productId", productId);
        history.push('/orders');
    }

    return (
        <div>
            <NavigationBar></NavigationBar>
            <div className="product-details-container">
                {product && isLoggedIn ? (
                    <div>
                        <Card key={product._id} variant="outlined" className="product-details-card">
                            <CardMedia
                                component="img"
                                alt={product.name}
                                height="140"
                                image={product.imageURL}
                                className="product-image"
                            />
                            <CardContent>
                                <Typography variant="h5">{product.name}</Typography>
                                <Typography variant="body2">Price: ${product.price}</Typography>
                                <Typography variant="body2">Category: {product.category}</Typography>
                                <Typography variant="body2">Available items: {product.availableItems}</Typography>
                                <Typography variant="body2">Description: {product.description}</Typography>
                                <Typography variant="body2">Manufacturer: {product.manufacturer}</Typography>

                            </CardContent>

                            <div>
                                <ValidatorForm onSubmit={() => orderClicked()}>
                                    <TextValidator
                                        className='form-field'
                                        label="Enter qty"
                                        type='number'
                                        name="qty"
                                        value={qty}
                                        onChange={inputChangedHandler}
                                        validators={['required', 'minNumber:1']}
                                        errorMessages={['Please enter the qty to order', 'Quantity must be higher than 0']}
                                    />
                                    <div className='order-btn-container'>
                                        <button className='order-btn' type='submit'>Place order</button>
                                    </div>
                                </ValidatorForm>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
                }
            </div >
        </div>

    );
}
