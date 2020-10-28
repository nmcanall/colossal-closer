import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { QUERY_CUSTOMERS } from '../../utils/queries'
import Auth from '../../utils/auth'

const CustomerList = () => {
    const _id = Auth.getProfile().data._id
    const { loading, data} = useQuery(QUERY_CUSTOMERS, {variables: {_id}})
    const  customers  = data ? data.customers : {}
    

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Phone</th>
                        <th>Sales</th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((customer, i) => (
                        
                        <tr>
                            <td>{customer.businessName}</td>
                            <td>{customer.phone}</td>
                            <td>${customer.dollarsSold}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}

export default CustomerList;