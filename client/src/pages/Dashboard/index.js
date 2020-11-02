import React from 'react';
import {Link } from 'react-router-dom';

import moment from 'moment'

import {QUERY_EMPLOYEE} from '../../utils/queries'

import {useQuery} from '@apollo/react-hooks'

import ClosingPercent from '../../components/ClosingPercent';
import CustomerStatusGraph from '../../components/CustomerStatusGraph';
import SaleByTypeGraph from '../../components/SaleByTypeGraph';

import Auth from '../../utils/auth';

const Dashboard = () => {

    let thisMonth = moment().startOf('month');
    let thisYear = moment().startOf("year");
    
    const _id = Auth.getProfile().data._id

    const { loading, data} = useQuery(QUERY_EMPLOYEE, {variables: {_id}})
    const  employee  = data ? data.employee : {}

    const totalSales = Math.round(employee.dollarsSold)

    const won = employee.wonCustomerCount
    const lost = employee.lostCustomerCount
    const active = employee.customerCount - won - lost;

    let ytdSales = 0
    let mtdSales= 0

    let units = 0
    let mtdUnits = 0
    let recentTransactions = 0
    let ytdTransactions = 0

    if(data){
        const customers = employee.customers

        for(const customer of customers){
            for(const transaction of customer.transactions){
                if(moment(transaction.createdAt).isSameOrAfter(thisYear)){
                    units += transaction.units
                    ytdSales += Math.round(transaction.dollars)

                    ytdTransactions++
                }
                
                if(moment(transaction.createdAt).isSameOrAfter(thisMonth)){
                    mtdUnits += transaction.units
                    mtdSales += Math.round(transaction.dollars)
                }

                if(moment(transaction.createdAt).isSameOrAfter(moment().subtract(7, 'days'))){
                    recentTransactions ++
                }
            }
        }
    }
    
    if(loading){return(<div>Loading...</div>)}
    return(
        <section className="main-container" >
            <div className="container center grey lighten-3" id="content-wrap">
               <div className = "card-panel grey col s12 m6 offset-3">
                <h2 className="center white-text">{employee.firstName}'s Sales Dashboard</h2>
                </div>
                <div className="sales-data">

                    <div className="row ">

                        <div className="col s12 m5 l3 ">
                            <div className="card-panel hoverable">
                                <h6 className="center">YTD Sales</h6>
                                <h3 className=" center">
                                    ${ytdSales}
                                </h3>
                            </div>
                        </div>

                        <div className="col s12 m5 l3">
                            <div className="card-panel hoverable">
                            <h6 className="center">MTD Sales</h6>
                                <h3 className=" center">
                                    ${mtdSales}
                                </h3>
                            </div>
                        </div>

                        <div className="col s12 m5 l3">
                            <div className="card-panel hoverable">
                            <h6 className="center">YTD Units</h6>
                                <h3 className=" center">
                                    {units}
                                </h3>
                            </div>
                        </div>
                        <div className="col s12 m5 l3">
                            <div className="card-panel hoverable">
                            <h6 className="center">MTD Units</h6>
                                <h3 className=" center">
                                    {mtdUnits}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        
                        <div className="col s12 m5 l3">
                            <div className="card-panel hoverable">
                            <h6 className="center">Total Customers</h6>
                                <h3 className=" center">
                                    {employee.customerCount}
                                </h3>
                            </div>
                        </div>

                        <div className="col s12 m5 l3">
                            <div className="card-panel ">
                            <h6 className="center ">Active Customers</h6>
                                <h3 className=" center">
                                    {active}
                                </h3>
                            </div>
                        </div>
                        <div className="col s12 m5 l3">
                            <div className="card-panel ">
                            <h6 className="center">Transactions last 7 Days</h6>
                                <h3 className=" center">
                                    {recentTransactions}
                                </h3>
                            </div>
                        </div>
                        <div className="col s12 m5 l3">
                            <div className="card-panel ">
                            <h6 className="center">YTD Transactions</h6>
                                <h3 className=" center">
                                    {ytdTransactions}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m4">
                            <div className="card-panel hoverable"  style={{fontFamily:'sans-serif',fontSize:'0.8em'}} >
                            <CustomerStatusGraph></CustomerStatusGraph>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="card-panel hoverable">
                                <SaleByTypeGraph></SaleByTypeGraph>
                            </div>
                        </div>
                        
                        <div className="col s12 m4">
                            <div className="card-panel hoverable">
                                <ClosingPercent></ClosingPercent>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )
}

export default Dashboard;
