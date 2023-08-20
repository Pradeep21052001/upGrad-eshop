import React from "react";
import { useHistory } from 'react-router-dom';
import './orderConfirmed.css';
import NavigationBar from "../navigation bar/NavigationBar";

export default function OrderConfrm() {

    const history = useHistory();

    function returntoProducts() {
        history.push('/products');
    }

    return (
        <div>
            <NavigationBar></NavigationBar>
            <div className="container">
                <h3 className="text">Your order is confirmed</h3>
                <button className="button" onClick={returntoProducts}>Continue Shopping</button>
            </div>
        </div>
    )
}