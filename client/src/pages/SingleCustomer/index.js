import React from 'react';
import {useParams} from 'react-router-dom'
import AddSale from '../../components/AddSale'
// import {USE_QUERY} = from ''

const SingleCustomer = () =>{
    const {customerId} = useParams();

    console.log(customerId)


    return(
        <div className="container grey lighten-3">
            <AddSale _id={customerId}></AddSale>
            Single Customer Page
            <p>Graphs, and lists coming soon!</p>
        </div>
    )
}

export default SingleCustomer;