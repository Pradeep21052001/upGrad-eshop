import React, { Fragment, useState, useEffect } from 'react';
import { Router, Route, useHistory } from 'react-router-dom';
import ProductsPage from '../products/Products';
import SignIn from '../sign in/SignIn';
import UserContext, { useUserContext } from '../user cotext/userContext';
import SignUp from '../sign up/SignUp';
import Home from '../home/home';
import AddProducts from '../add products/AddProductsPage';

export default function MainComponent() {

  const accessToken = '1@3456Qw-';

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
        alert('Registered');
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
      .then(response => response.json())
      .then(data => {
        accessToken = data.accessToken;
        setIsLoggedIn(true);
        alert(accessToken)

        setIsAdmin(true);

        history.push('/products')
      })
      .catch(error => {
        alert("Invalid Credentials!");
      });
  }


  const [productsList, setProductsList] = useState([]);

  async function getProducts() {
    const response = await fetch("http://localhost:3001/api/v1/users")
    const data = response.json();
    setProductsList(data);
  }
  useEffect(() => {
    getProducts();
  }, [])


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
        productsList = {productsList}
        getProducts={() => getProducts()}/>} />

      <Route exact path="/add-products" render={() => <AddProducts
        addProduct={(addProductsForm) => addProduct(addProductsForm)} />} />
    </Fragment>

  );
}