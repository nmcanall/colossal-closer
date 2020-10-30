import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks'
import { QUERY_CUSTOMERS } from '../../utils/queries'
import { useStoreContext, ADD_STATE_CUSTOMERS } from '../../utils/GlobalState';
import { Link } from 'react-router-dom';

const CustomerList = ({ _id }) => {
    const { loading, data} = useQuery(QUERY_CUSTOMERS, {variables: {_id}})
    const [state, dispatch] = useStoreContext()
    const { customers } = state
    useEffect(() => {
        if (data && !customers.length) {
            dispatch({
                type: ADD_STATE_CUSTOMERS,
                customers: data.customers
            })
        }
    }, [data, dispatch])
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div className="">
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Sales</th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((customer, i) => (
                        <tr key={i}>
                            
                            <td><Link to={`/customers/${customer._id}`}>{customer.businessName}</Link></td>
                            <td>{customer.phone}</td>
                            <td>${Math.round(customer.dollarsSold)}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}

export default CustomerList;