import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

    return (
    <div> Hello World </div>
    )
}

export default App