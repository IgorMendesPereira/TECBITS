import React from "react"
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom"
import { isAuthenticated } from "./services/auth";

import LandingPage from './pages/LandingPage'
import Sell from './pages/Sell'
import Register from './pages/Register'
import Login from './pages/Login'
import Product from './pages/Product'
import AllProduct from './pages/AllProducts'
import NewRegister from './pages/NewRegister'
import img from './assets/naodisponivel.png'


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path= "/" exact component = {LandingPage}></Route>
                <PrivateRoute path= "/sell" component = {Sell}></PrivateRoute>
                <PrivateRoute path= "/register" component = {Register}></PrivateRoute>
                <PrivateRoute path= "/newregister" component = {NewRegister}></PrivateRoute>
                <Route path = "/login" component = {Login}></Route>
                <PrivateRoute path = "/product" component ={Product}></PrivateRoute>
                <PrivateRoute path = "/allproduct" component ={AllProduct}></PrivateRoute>
                <Route path="*" component={() => <img style={{padding:200, marginLeft: 150}} src = {img}></img>} />
            </Switch>
        </BrowserRouter>
    )
}