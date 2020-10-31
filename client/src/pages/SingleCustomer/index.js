import React from 'react';
import {useParams} from 'react-router-dom'
import AddSale from '../../components/AddSale'
import {useQuery} from '@apollo/react-hooks';
import {QUERY_CUSTOMER} from '../../utils/queries'

const SingleCustomer = () =>{
    const {id} = useParams();
    const _id = id.trim()

    console.log('singleid', _id)
    const { loading, data} = useQuery(QUERY_CUSTOMER, {variables: {_id}})
    
    const  customer  = data ? data.customer : {}
    console.log('thisworks', customer)
    
    let transArr =[]
    if(data){
        for(const transaction of customer.transactions){
            console.log(transaction)
            transArr.push(transaction)
        }
    }
    


    return(
        <div className="container">
            
            <AddSale _id={id}></AddSale>
            <div className="row center grey lighten-3">
                <h2>{customer.businessName}</h2>
            </div>
            <div class="row">
                <div class="col s12 m5">
                    <div class="card-panel grey lighten-3">
                        <h4>
                            Customer Info
                        </h4>
                        <p><strong className="blue-text text-darken-2">Company Name:</strong> {`  ${customer.businessName}` }</p>
                        <p><strong className="blue-text text-darken-2">Contact Name:</strong>{`  ${customer.contactName}` }</p>
                        <p><strong className="blue-text text-darken-2">Phone:</strong><a href={`tel:${customer.phone}`}>{`  ${customer.phone}` }</a></p>
                        <p><strong className="blue-text text-darken-2">Email:</strong> <a href={`mailto:${customer.email}`}>{`  ${customer.email}` }</a></p>

                    </div>
                </div>
                <div class="col s12 m7">
                    <div class="card-panel grey lighten-3">
                        <h4>Last 5 Transactions</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Product</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transArr.slice(0,5).map((transaction, i) => (
                                    
                                    <tr key={i}>
                                        
                                        <td>{transaction.createdAt}</td>
                                        <td>{transaction.product}</td>
                                        <td>${Math.round(transaction.dollars)}</td>
                                    </tr>
                                    
                                ))}
                                
                            </tbody>
                        </table>
                
                    </div>
                </div>
            </div>
                
        </div>
    )
}

export default SingleCustomer;