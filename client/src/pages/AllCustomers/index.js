import React from 'react'
import Auth from '../../utils/auth'
import CustomerList from '../../components/CustomerList';

const AllCustomers = () =>{
    const employee = Auth.getProfile().data
    return (
        <div>
            <h4>
                {employee.firstName}'s Working List
            </h4>
            <CustomerList _id={employee._id}></CustomerList>
        </div>
    )
}

export default AllCustomers;