import React from 'react';
import {Link } from 'react-router-dom';

import moment from 'moment'

import {QUERY_EMPLOYEE} from '../../utils/queries'

import {useQuery} from '@apollo/react-hooks'

import ClosingPercent from '../../components/ClosingPercent';
import CustomerStatusGraph from '../../components/CustomerStatusGraph';
import SaleByTypeGraph from '../../components/SaleByTypeGraph';

import Auth from '../../utils/auth';


//import sample data


const Dashboard = () => {

    let thisMonth = moment().startOf('month');
    let thisYear = moment().startOf("year");
    
    const _id = Auth.getProfile().data._id

    const { loading, data} = useQuery(QUERY_EMPLOYEE, {variables: {_id}})
    const  employee  = data ? data.employee : {}
    let transArr= []

    const totalSales = Math.round(employee.dollarsSold)

    const won = employee.wonCustomerCount
    // console.log('wonnnnn', won)
    const lost = employee.lostCustomerCount
    // console.log('lost', ost)
    const active = employee.customerCount - won - lost;

    let units = 0
    let mtdUnits = 0
    let recentTransactions = 0

    if(data ){
        console.log('main data',employee)
        const customers = employee.customers
        console.log('customers', customers)
        // const numCustomers = customers.length
        // const statuses = customers.status


        for(const customer of customers){
            for(const transaction of customer.transactions){
                if(moment(transaction.createdAt).isSameOrAfter(thisYear)){
                units += transaction.units
                
                }
                
                if(moment(transaction.createdAt).isSameOrAfter(thisMonth)){
                    mtdUnits += transaction.units
                }

                if(moment(transaction.createdAt).isSameOrAfter(moment().subtract(7, 'days'))){
                    recentTransactions ++
                }

                
                
            }
        }

        console.log('mtdunits',mtdUnits)
        console.log('did it work????', units)
    
        
    }
    


    if(loading){return(<div>Loading...</div>)}
    return(
        <section className="container center">
            <h5 className="center">{employee.firstName}'s Sales Dashboard</h5>

            <div className="sales-data">

                <div className="row ">

                    <div className="col s12 m5 l3 ">
                        <div className="card-panel hoverable">
                            <h5 className="center yellow">MTD Sales</h5>
                            <h3 className=" center">
                                $8,650
                            </h3>
                        </div>
                    </div>

                    <div className="col s12 m5 l3">
                        <div className="card-panel hoverable">
                        <h5 className="center">Total Sales</h5>
                            <h3 className=" center">
                                ${totalSales}
                            </h3>
                        </div>
                    </div>

                    <div className="col s12 m5 l3">
                        <div className="card-panel hoverable">
                        <h5 className="center">MTD Units</h5>
                            <h3 className=" center">
                                {mtdUnits}
                            </h3>
                        </div>
                    </div>
                    <div className="col s12 m5 l3">
                        <div className="card-panel hoverable">
                        <h5 className="center">Total Units</h5>
                            <h3 className=" center">
                                {units}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    


                    <div className="col s12 m5 l3">
                        <div className="card-panel hoverable">
                        <h5 className="center">Total Customers</h5>
                            <h3 className=" center">
                                {employee.customerCount}
                            </h3>
                        </div>
                    </div>

                    <div className="col s12 m5 l3">
                        <div className="card-panel ">
                        <h5 className="center yellow">Sold Customers</h5>
                            <h3 className="green-text center">
                                total transactions
                            </h3>
                        </div>
                    </div>
                    <div className="col s12 m5 l3">
                        <div className="card-panel ">
                        <h5 className="center">Recent Transactions</h5>
                        <p>(last 7 Days)</p>
                            <h3 className=" center">
                                {recentTransactions}
                            </h3>
                        </div>
                    </div>
                    <div className="col s12 m5 l3">
                        <div className="card-panel ">
                        <h5 className="center">Active Customers</h5>
                            <h3 className=" center">
                                {active}
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
        </section>

    )
}

export default Dashboard;
