import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import AddSale from '../../components/AddSale'
import {useQuery} from '@apollo/react-hooks';
import {QUERY_CUSTOMER} from '../../utils/queries'
import moment from 'moment'
import { useStoreContext, ADD_STATE_TRANSACTIONS, UPDATE_STATE_CUSTOMER, SET_CURRENT_CUSTOMER } from '../../utils/GlobalState';

import CustomerSaleByTypeGraph from '../../components/CustomerSaleByType';
import ChangeStatus from '../../components/ChangeStatus';

const SingleCustomer = () =>{
    const {id} = useParams();
    const thisMonth = moment().startOf('month');
    const _id = id.trim()
    const [state, dispatch] = useStoreContext()
    const [totalSales, setTotalSales] = useState(0)
    const [mtdSales, setMtdSales] = useState(0)

    const { loading, data} = useQuery(QUERY_CUSTOMER, {variables: {_id}})
    let  customer  = data ? data.customer : {}
    const transactions = state.transactions[id] || []
    useEffect(() => {
        console.log("CHANGEING CURRENT CUSTOMER")
        for (const stateCustomer of state.customers) {
            if (stateCustomer._id === id) {
                dispatch({
                    type: SET_CURRENT_CUSTOMER,
                    customer: {...stateCustomer}
                })
                break
            } 
        }
    }, [state.customers])
    useEffect(() => {
        if (data && !state.transactions[id]) {
            dispatch({
                type: ADD_STATE_TRANSACTIONS,
                transactions: {[id]: data.customer.transactions}
            })
        }
        let totalDollars = 0
        let monthDollars = 0
        for (const transaction of transactions) {
            totalDollars += Math.round(transaction.dollars)
            if(moment(transaction.createdAt).isSameOrAfter(thisMonth)){
                monthDollars += Math.round(transaction.dollars)
            }
            setMtdSales(monthDollars)
            setTotalSales(totalDollars)
        }
        // update the $ figure on the /customers page
        if (data && data.customer.dollarsSold !== totalDollars) {
            dispatch({
                type: UPDATE_STATE_CUSTOMER,
                customer: {_id, dollarsSold: totalDollars}
            })
        }
    }, [data, state.transactions, dispatch, transactions])
    if (loading) {
        return <div>Loading...</div>
    }
    if (state.currentCustomer) {
        customer = state.currentCustomer
    }
    return(
        <section className="main-container">
            <div className="container" id="content-wrap">
                <div className="card-panel center grey lighten-3 center col s12">
                    
                    <div className="row">
                        <ChangeStatus customerId={id} status={customer.status}> </ChangeStatus>
                        <AddSale customerId={id}></AddSale>
                    </div>
                    
                    <div className="row center valign-wrapper">
                        <div className=" col s7 offset-s2 center">
                            <h3 className="center">{customer.businessName}</h3>
                        </div>
                    </div>
                    <div className="row  center">
                        <div className="col s12 m5 cust-info card-panel 3 z-depth-1">
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
                        <div className="row">
                            <div className="col s12 m6 ">
                                <div className=" card-panel  ">
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
                                        {transactions.slice(Math.max(transactions.length - 5, 0)).map((transaction, i) => (
                                                
                                                <tr key={i}>
                                                    <td>{moment(transaction.createdAt).format("MMM DD, YYYY")}</td>
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
                    <div className='row center'>
                        <div className="col s12 m4 offset-m2">
                            <div className="row">
                                <div className="card-panel hoverable">
                                    <h6 className="center">All Time Sales</h6>
                                    <h3 className=" center">
                                        ${totalSales}
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
                        <div className="row">
                            <div className="col s12 m4">
                                <div className="card-panel hoverable"  style={{fontFamily:'sans-serif',fontSize:'0.8em'}} >
                                    <CustomerSaleByTypeGraph transArr={transactions}></CustomerSaleByTypeGraph>
                                </div>
                            </div>
                            {/* <div className=" card panel col s12 m6" id="singleGraph">
                                <CustomerSaleByTypeGraph transArr={transactions}></CustomerSaleByTypeGraph>
                            </div> */}
                        
                        </div>
                    </div>
                        
                </div>
            </div>
        </section>
    )
}

export default SingleCustomer;