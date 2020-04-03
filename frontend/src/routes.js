import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import LandingPage from './pages/LandingPage'
import Sell from './pages/Sell'
import Register from './pages/Register'
import Login from './pages/Login'
import Product from './pages/Product'
import AllProduct from './pages/AllProducts'

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path= "/" exact component = {LandingPage}></Route>
                <Route path= "/sell" component = {Sell}></Route>
                <Route path= "/register" component = {Register}></Route>
                <Route path = "/login" component = {Login}></Route>
                <Route path = "/product" component ={Product}></Route>
                <Route path = "/allproduct" component ={AllProduct}></Route>
            </Switch>
        </BrowserRouter>
    )
}