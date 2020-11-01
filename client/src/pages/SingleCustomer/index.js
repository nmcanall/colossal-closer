import React from 'react';
import {useParams} from 'react-router-dom'
import AddSale from '../../components/AddSale'
import {useQuery} from '@apollo/react-hooks';
import {QUERY_CUSTOMER} from '../../utils/queries'
import moment from 'moment'

const SingleCustomer = () =>{
    const {id} = useParams();
    const _id = id.trim()

    // console.log('singleid', _id)
    const { loading, data} = useQuery(QUERY_CUSTOMER, {variables: {_id}})
    
    const  customer  = data ? data.customer : {}
    console.log('thisworks', customer)
    
    let transArr =[]
    
    if(data){
        for(const transaction of customer.transactions){
            
            transArr.push(transaction)
        }
    }


    return(
        <div className="container">
            
            <AddSale _id={id}></AddSale>
            <div className="row center valign-wrapper">
                <div className="card-panel col s8 offset-s2 center grey lighten-3 z-depth-3">
                    <h2>{customer.businessName}</h2>
                </div>
            </div>
            <div className="row  valign-wrapper center">
                <div className="col s12 m5 cust-info card-panel grey lighten-3 z-depth-3">
                    <div className=" grey lighten-3 ">
                        <h4>
                            Customer Info
                        </h4>
                        <div className="">
                            <p><strong className="blue-text text-darken-2">Company Name:</strong> {`  ${customer.businessName}` }</p>
                            <p><strong className="blue-text text-darken-2">Contact Name:</strong>{`  ${customer.contactName}` }</p>
                            <p><strong className="blue-text text-darken-2">Phone:</strong><a href={`tel:${customer.phone}`}>{`  ${customer.phone}` }</a></p>
                            <p><strong className="blue-text text-darken-2">Email:</strong> <a href={`mailto:${customer.email}`}>{`  ${customer.email}` }</a></p>
                            <p><strong className="blue-text text-darken-2">Status:</strong> {`  Customer ${customer.status}` }</p>
                        </div>
                    </div>
                </div>
                <div className="col s12 m6 card-panel grey lighten-3 z-depth-3">
                    <div className=" grey lighten-3 ">
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