import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { StoreProvider } from './utils/GlobalState'
//pages and components
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import Signup from './pages/Signup';
import AllCustomers from './pages/AllCustomers';
import NoMatch from './pages/NoMatch';
import Auth from '../src/utils/auth';
import AllTransactions from './pages/AllTransactions';
import SingleCustomer from './pages/SingleCustomer';
import OfflineHandler from './components/OfflineHandler'

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
                <StoreProvider>
                    {loggedIn && <OfflineHandler/>}
                    <div id="html">
                        <Header/>
                        <main className="" id="content-wrap" on>
                            {loggedIn ? (
                                    <Switch>
                                    <Route exact path = '/' component = {Dashboard}/>
                                    <Route exact path = '/signup' component = {Signup}/>
                                    <Route exact path = '/customers' component = {AllCustomers}/>
                                    <Route exact path = '/customers/:id' component = {SingleCustomer}/>
                                    <Route exact path = '/sales' component ={AllTransactions}/>
                                    <Route component ={NoMatch}/>
                                    </Switch>
                                ) : (
                                    <Switch>
                                    <Route exact path = '/signup' component = {Signup}/>
                                    <Route component = {Login} />
                                    </Switch>
                                )}
                        </main>
                        <Footer id="footer">
                        </Footer>
                    </div>
                </StoreProvider>
            </Router>
        </ApolloProvider>
    );
};

export default App;

