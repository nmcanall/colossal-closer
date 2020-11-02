import React from 'react';

import Auth from '../../utils/auth'

import SalesList from '../../components/SalesList';

const AllTransactions = () =>{
    const employee = Auth.getProfile().data
    
    return (
        <section className="main-container">
            <div className= "container grey lighten-3" id="content-wrap">
                <h4 className="center">
                    {employee.firstName}'s Lifetime Sales
                </h4>
                <SalesList _id={employee._id}></SalesList>
            </div>
        </section>
    )

}

export default AllTransactions;