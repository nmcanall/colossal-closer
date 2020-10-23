import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/dashboard';
import Customers from './components/customers';
import Sales from './components/sales';
import Other from './components/other';


// import Contact from './components/Contact';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { ApolloProvider } from '@apollo/react-hooks';
// import ApolloClient from 'apollo-boost';

// borrowed from the classwork, will uncomment when the JWT auth is set up
// const client = new ApolloClient({
//     request: (operation) => {
//       const token = localStorage.getItem('id_token')
//       operation.setContext({
//         headers: {
//           authorization: token ? `Bearer ${token}` : ''
//         }
//       })
//     },
//     uri: '/graphql',
// })
  
function App() {
    const [pages] = useState(["dashboard", "customers", "sales", "other"]);
    const [pageSelected, setPageSelected] = useState(pages[0]);
    
    return (
        <div id="html">
          <Header pageSelected={pageSelected}
            setPageSelected={setPageSelected} />
          <main className="light-blue darken-3 white-text">
            {(pageSelected === "dashboard") && <Dashboard />}
            {(pageSelected === "customers") && <Customers />}
            {(pageSelected === "sales") && <Sales />}
            {(pageSelected === "other") && <Other />}
          </main>
          <Footer>
            
          </Footer>
        </div>
    );
}

export default App;