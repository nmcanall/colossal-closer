import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { QUERY_CUSTOMERS } from '../../utils/queries'

const CustomerList = ({ _id }) => {
    console.log('id please',_id)

    const { loading, data} = useQuery(QUERY_CUSTOMERS, {variables: {_id}})
    

    const  customers  = data ? data.customers : {}
    console.log('dollar dolla billz', customers.dollarsSold)
    

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div className="container">
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
                        
                        <tr key={i}>
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