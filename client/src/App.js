import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//pages and components
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import Signup from './pages/Signup';
import AllCustomers from './pages/AllCustomers';
import SingleCustomer from './pages/SingleCustomer';
import NoMatch from './pages/NoMatch';




// import Contact from './components/Contact';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// borrowed from the classwork, will uncomment when the JWT auth is set up
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
    const [pages] = useState(["dashboard", "customers", "sales", "other"]);
    const [pageSelected, setPageSelected] = useState(pages[0]);

    return (
        <ApolloProvider client={client}>
            <Router>
                <div id="html">
                    <Header pageSelected={pageSelected}
                        setPageSelected={setPageSelected} />
                    <main className="">
                        <Switch>
                            <Route exact path = '/' component = {Login}/>
                            <Route exact path = '/signup' component = {Signup}/>
                            <Route exact path = '/dashboard' component = {Dashboard}/>
                            {/* <Route exact path = '/customers/:id' component = {AllCustomers}/> */}
                            {/* <Route exact path = '/:id/:customerid' component = {SingleCustomer}/> */}


                            <Route component ={NoMatch}/>
                        </Switch>

                    </main>
                    <Footer>
                        
                    </Footer>

                </div>
            </Router>
        </ApolloProvider>
    );
};

export default App;