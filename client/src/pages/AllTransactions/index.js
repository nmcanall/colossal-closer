import React from 'react';

import Auth from '../../utils/auth'

import SalesList from '../../components/SalesList';
// import AddSale from '../../components/AddSale'

const AllTransactions = () =>{
    const employee = Auth.getProfile().data
    
    return (
        <section className="main-container">
            <div className= "container grey lighten-3" id="content-wrap">
            <div className="card-panel grey col s12 m6 offset-3">
                <h4 className="center white-text">
                    {employee.firstName}'s Lifetime Sales
                </h4>
            </div>
                <SalesList _id={employee._id}></SalesList>
            </div>
        </section>
    )

}

export default AllTransactions;