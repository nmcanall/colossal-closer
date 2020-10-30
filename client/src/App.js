import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//pages and components
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import Signup from './pages/Signup';
import AllCustomers from './pages/AllCustomers';
import NoMatch from './pages/NoMatch';
import Auth from '../src/utils/auth'



// import Contact from './components/Contact';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    request: (operation) => {
        const token = localStorage.getItem('id_token')
        operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    })
    },
    uri: '/graphql',
})

function App() {
    const loggedIn = Auth.loggedIn()
    return (
        <ApolloProvider client={client}>
            <Router>
                <div id="html">
                    <Header/>
                    <main className="">
                        {loggedIn ? (
                                <Switch>
                                <Route exact path = '/' component = {Dashboard}/>
                                <Route exact path = '/signup' component = {Signup}/>
                                <Route exact path = '/customers' component = {AllCustomers}/>
                                {/* <Route exact path = '/customers/:customerId' component = {SingleCustomer}/> */}
                                <Route component ={NoMatch}/>
                                </Switch>
                            ) : (
                                <Switch>
                                <Route exact path = '/signup' component = {Signup}/>
                                <Route component = {Login} />
                                </Switch>
                            )}
                    </main>
                    <Footer>
                    </Footer>
                </div>
            </Router>
        </ApolloProvider>
    );
};

export default App;

