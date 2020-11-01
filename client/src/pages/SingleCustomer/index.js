import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom'
import AddSale from '../../components/AddSale'
import {useQuery} from '@apollo/react-hooks';
import {QUERY_CUSTOMER} from '../../utils/queries'
import moment from 'moment'
import { useStoreContext, ADD_STATE_TRANSACTIONS } from '../../utils/GlobalState';


import CustomerSaleByTypeGraph from '../../components/CustomerSaleByType';

const SingleCustomer = () =>{
    const {id} = useParams();
    const _id = id.trim()
    // console.log('neds',_id)
    const [state, dispatch] = useStoreContext()

    let thisMonth = moment().startOf('month');

    console.log('singleid', _id)
    const { loading, data} = useQuery(QUERY_CUSTOMER, {variables: {_id}})
    
    const  customer  = data ? data.customer : []
    const customerTransactions = data ? data.customer.transactions : []
    // console.log('thisworks', customer)
    
    let transArr =[]
    let mtdSales=0
    

        const { transactions } = state
        useEffect(() => {
            if (customerTransactions && !transactions.length) {
                dispatch({
                    type: ADD_STATE_TRANSACTIONS,
                    transactions: customerTransactions
                    
                })
            }
            console.log('fromstatefkjkf',transactions)
        }, [data, dispatch, transactions, customerTransactions, ADD_STATE_TRANSACTIONS])
                
            console.log('thigkang', customerTransactions)
            for(const transaction of customerTransactions){
                // const dollars = Number(transaction.dollars);
                
                transArr.push(transaction)
                if(moment(transaction.createdAt).isSameOrAfter(thisMonth)){
                    
                    mtdSales += Math.round(transaction.dollars)
                }
            }
        


    return(
        <div className="container">
            <div className="card-panel center grey lighten-3 center col s12">
                
                <AddSale _id={id}></AddSale>
                <div className="row center valign-wrapper">
                    <div className=" col s7 offset-s2 center ">
                        <h2 className="">{customer.businessName}</h2>
                    </div>
                </div>
                <div className="row  valign-wrapper center">
                    <div className="col s12 m5 cust-info card-panel grey lighten-3 z-depth-3">
                        <div className=" ">
                            <h4>
                                Customer Info
                            </h4>
                            <div className="">
                            <p><strong className="blue-text text-darken-2">Company Name:</strong> {`  ${customer.businessName}` }</p>
                            <p><strong className="blue-text text-darken-2">Contact Name:</strong>{`  ${customer.contactName}` }</p>
                            <p><strong className="blue-text text-darken-2">Phone:</strong><a href={`tel:${customer.phone}`}>{`  ${customer.phone}` }</a></p>
                            <p><strong className="blue-text text-darken-2">Email:</strong> <a href={`mailto:${customer.email}`}>{`  ${customer.email}` }</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6 ">
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
                <div className='row'>
                    <div className="col s12 m4 offset-m1">
                        <div className="row">
                            <div className="card-panel hoverable">
                                <h6 className="center">All Time Sales</h6>
                                <h3 className=" center">
                                    ${customer.dollarsSold}
                                </h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="card-panel hoverable">
                                <h6 className="center">MTD Sales</h6>
                                <h3 className=" center">
                                    ${mtdSales}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <CustomerSaleByTypeGraph customer={customer}></CustomerSaleByTypeGraph>
                    </div>
                </div>
                    
            </div>
        </div>
    )
}

export default SingleCustomer;