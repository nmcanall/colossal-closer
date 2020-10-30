// all transactions from all customers of a single employee
import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CUSTOMERS } from '../../utils/queries';

const SalesList = ({_id}) =>{
    console.log('dat id doe', _id)
    const { loading, data} = useQuery(QUERY_CUSTOMERS, {variables: {_id}})
    const  customers  = data ? data.customers : {}
    console.log('customers',customers)
    let transactionsArr = []
    if(data){
        
    //     const transactions = customers.transaction
        for(const customer of customers){
            for(const transaction of customer.transactions){
                transactionsArr.push(transaction)
                
            }
        }
    }
    console.log('dat arrr doe', transactionsArr)

    return(
        <div className="">
            hello world
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
                            
                            <td>{transaction.businessName}</td>
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