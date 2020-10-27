import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import Signup from './pages/Signup';
import AllCustomers from './pages/AllCustomers';




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
            <div id="html">
                <Header pageSelected={pageSelected}
                    setPageSelected={setPageSelected} />
                <main className="">
                    <Dashboard></Dashboard>
                    {/* <Login></Login> */}
                    {/* <Signup></Signup> */}
                    {/* <AllCustomers></AllCustomers> */}

                </main>
                <Footer>
                    
                </Footer>

            </div>
        </ApolloProvider>
    );
};

export default App;