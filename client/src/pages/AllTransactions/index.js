import React from 'react';

import Auth from '../../utils/auth'

import SalesList from '../../components/SalesList';
// import AddSale from '../../components/AddSale'

const AllTransactions = () =>{
    const employee = Auth.getProfile().data
    
    return (
        <div className= "container grey lighten-3" id="containers">
                
            <h4 className="center">
                {employee.firstName}'s Lifetime Sales
            </h4>
            <SalesList _id={employee._id}></SalesList>
        </div>
    )

}

export default AllTransactions;