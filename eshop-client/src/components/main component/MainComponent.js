import React, { Fragment, useState, useEffect } from 'react';
import { Router, Route, useHistory } from 'react-router-dom';
import ProductsPage from '../products/Products';
import SignIn from '../sign in/SignIn';
import UserContext, { useUserContext } from '../user cotext/userContext';
import SignUp from '../sign up/SignUp';
import Home from '../home/home';
import AddProducts from '../add products/AddProductsPage';
import ProductDetails from '../product details/product details';
import Orders from '../orders/orders';
import Address from '../address/address';
import AddAddress from '../add address/add address';


export default function MainComponent() {

  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useUserContext();
  const history = useHistory();

  async function registerDetails(detailsForm) {
    await fetch("http://localhost:3001/api/v1/users",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(detailsForm)
      })
      .then(response => response.json())
      .then(data => {
        history.push('/signIn')
      })
      .catch(error => {
        alert(error);
      });
  }

  async function checkCredentials(credentialsForm) {
    await fetch("http://localhost:3001/api/v1/auth",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentialsForm)
      })
      // .then(response => response.json())
      .then(data => {
        const accessToken = data.headers.get('X-Auth-Token');
        sessionStorage.setItem("accessToken", accessToken);
        setIsLoggedIn(true);
        console.log(accessToken);
        getProducts();
        fetchCategories();
        history.push('/products');
      })
      .catch(error => {
        alert("Invalid Credentials!");
      });
  }


  const [productsList, setProductsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const accessToken = sessionStorage.getItem("accessToken");


  async function getProducts() {
    const response = await fetch("http://localhost:3001/api/v1/products");
    const data = await response.json();
    setProductsList(data);
    console.log('Products from data:', data);
  }

  // useEffect(() => {
  //   getProducts();
  // }, [productsList]);


  async function fetchCategories() {
    const response = await fetch("http://localhost:3000/products/categories");
    const data = await response.json();
    setCategories(data);
    console.log(data)
  }


  async function addProduct(addProductsForm) {
    await fetch("http://localhost:3001/api/v1/products",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(addProductsForm)
      })
      .then(response => response.json())
      .then(data => {
        alert('Product Added');
      })
      .catch(error => {
        alert(error);
      });
  }

  return (
    <Fragment>
      <Route exact path="/" render={() => <Home />} />

      <Route exact path="/signIn" render={() => <SignIn
        checkCredentials={(credentialsForm) => checkCredentials(credentialsForm)} />} />

      <Route exact path="/signUp" render={() => <SignUp
        registerDetails={(detailsForm) => registerDetails(detailsForm)} />} />

      <Route exact path="/products" render={() => <ProductsPage
        productsList={productsList}
        categories={categories}
      // getProducts={() => getProducts()}
      />} />

      <Route exact path="/add-products" render={() => <AddProducts
        addProduct={(addProductsForm) => addProduct(addProductsForm)} />} />

      <Route exact path="/product-details/:productId" render={() => <ProductDetails />} />

      <Route exact path="/orders" render={() => <Orders />} />

      <Route exact path="/address" render={() => <Address />} />

      <Route exact path="/add-address" render={() => <AddAddress />} />

    </Fragment>

  );
}  