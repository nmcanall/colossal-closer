import React from 'react'
import Auth from '../../utils/auth'
import CustomerList from '../../components/CustomerList';

import AddCustomer from '../../components/AddCustomer';

const AllCustomers = () =>{
    const employee = Auth.getProfile().data
    return (
        <div className= "container grey lighten-3" id="containers">
                <AddCustomer></AddCustomer>
            <h4 className="center">
                {employee.firstName}'s Working List
            </h4>
            <CustomerList _id={employee._id} ></CustomerList>
        </div>
    )
}

export default AllCustomers;