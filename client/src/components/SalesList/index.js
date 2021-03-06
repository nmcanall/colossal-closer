// all transactions from all customers of a single employee
import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CUSTOMERS } from '../../utils/queries';
import {Link} from 'react-router-dom';

const SalesList = ({_id}) =>{

    const { loading, data} = useQuery(QUERY_CUSTOMERS, {variables: {_id}})

    const  customers  = data ? data.customers : {};
    
    let transactionsArr = []

    //make sure data is coming through
    if(data){
        //loop through data
        for(const customer of customers){
            const bizName = customer.businessName
            const customerId = customer._id
            for(const transaction of customer.transactions){
                transaction.customerId=customerId
                transaction.businessName=bizName
                transactionsArr.push(transaction)
            }
        }
    }
    if(loading){return(<div>Loading...</div>)}
    return(
        <div className=" container">
            
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Product</th>
                        <th>Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {transactionsArr.map((transaction, i) => (
                        <tr key={i}>
                            
                            <td><Link to={`/customers/${transaction.customerId}`}>{transaction.businessName}</Link></td>
                            <td>{transaction.product}</td>
                            <td>${Math.round(transaction.dollars)}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}

export default SalesList;