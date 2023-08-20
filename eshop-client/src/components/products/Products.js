    import React, { useState, useEffect } from 'react';
    import NavigationBar from '../navigation bar/NavigationBar';
    import UserContext, { useUserContext } from '../user cotext/userContext';
    import { useHistory } from 'react-router-dom';
    import { Card, ToggleButton, ToggleButtonGroup, CardContent, CardMedia, Typography } from '@mui/material';
    import './products.css';
    import ProductDetails from '../product details/product details';

    export default function ProductsPage({ productsList, categories, deleteHandler }) {

        const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUserContext();
        const history = useHistory();

        // const[products,setProducts] = useState(productsList);
        const [selectedCategory, setSelectedCategory] = useState('Apparel');
        const [sortingOption, setSortingOption] = useState('default');
        const [showDeletedMessage, setshowDeletedMessage] = useState(false);
        const [showAddedMessage, setshowAddedMessage] = useState(false);

        // useEffect(() => {
        //     // Fetch categories
        //     fetchCategories();

        // }, []);


        const handleCategoryClick = async (category) => {
            setSelectedCategory(category);
            // fetchProductsByCategoryAndSorting(category, sortingOption);
        };

        const handleSortingChange = (event, newSortingOption) => {
            setSortingOption(newSortingOption);
            // fetchProductsByCategoryAndSorting(selectedCategory, newSortingOption);
        };

        // const fetchProductsByCategoryAndSorting = async (category, sorting) => {
        //     try {
        //         const response = await fetch(`http://localhost:3000/products?category=${category}&sorting=${sorting}`);
        //         const data = await response.json();
        //         productsList = data;
        //     } catch (error) {
        //         console.error("Error fetching products:", error);
        //     }
        // };

        function buyClicked(productId) {
            history.push(`/product-details/${productId}`);
        }

        function modifyClicked(productid) {
            history.push(`/modify-product/${productid}`)
        }

        function deleteClicked(productid, productname) {
            deleteHandler(productid, productname);
            setshowDeletedMessage(true);
            setTimeout(() => {
                setshowDeletedMessage(false);
            }, 2500);
        }

        return (
            <div>
                <NavigationBar />
                {isLoggedIn ? (
                    <>
                        {showDeletedMessage && <div className="delete-message">
                            <h3>Product deleted successfully</h3>
                        </div>}
                        {/* {showAddedMessage && <div className="message">
                            <h3>Product added successfully</h3>
                            </div>} */}
                        <ToggleButtonGroup
                            value={categories}
                            exclusive
                            onChange={(event, newCategory) => handleCategoryClick(newCategory)}
                            className='toggle'
                        >
                            {categories.map((category) => (
                                <ToggleButton key={category} value={category}>
                                    {category}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>

                        <ToggleButtonGroup
                            value={sortingOption}
                            exclusive
                            onChange={handleSortingChange}
                            className='toggle'
                        >
                            <ToggleButton value="default">Default</ToggleButton>
                            <ToggleButton value="priceHighToLow">Price high to low</ToggleButton>
                            <ToggleButton value="priceLowToHigh">Price low to high</ToggleButton>
                            <ToggleButton value="newest">Newest</ToggleButton>
                        </ToggleButtonGroup>

                        <div className="products-list">
                            {productsList.map((product) => (
                                <Card key={product._id} variant="outlined">
                                    <CardMedia
                                        component="img"
                                        alt={product.name}
                                        height="140"
                                        image={product.imageURL}
                                    />
                                    <CardContent>
                                        <div>
                                            <Typography variant="h5">{product.name}</Typography>
                                            <Typography variant="body2">Price: ${product.price}</Typography>
                                            <Typography variant="body2">Category: {product.category}</Typography>
                                        </div>
                                        {isAdmin &&
                                            <span>
                                                <button className='admin-button' id='modify-btn' onClick={() => modifyClicked(product._id)}>Modify</button>
                                                <button className='admin-button' id='delete-btn' onClick={() => deleteClicked(product._id, product.name)}>Delete</button>
                                            </span>
                                        }
                                    </CardContent>
                                    {!isAdmin &&
                                        <div className='buy-btn-container'>
                                            <button className='buy-btn' onClick={() => buyClicked(product._id)}>Buy now</button>
                                        </div>
                                    }

                                </Card>
                            ))}
                        </div>
                    </>
                ) : (
                    history.push('/signIn')
                )}
            </div>
        )
    }