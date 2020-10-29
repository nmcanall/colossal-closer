import React from 'react';
import {Link } from 'react-router-dom';

import moment from 'moment'

import {QUERY_EMPLOYEE, QUERY_CUSTOMERS} from '../../utils/queries'

import {useQuery} from '@apollo/react-hooks'

import ClosingPercent from '../../components/ClosingPercent';
import CustomerStatusGraph from '../../components/CustomerStatusGraph';
import SaleByTypeGraph from '../../components/SaleByTypeGraph';

import Auth from '../../utils/auth';


//import sample data


const Dashboard = () => {

    let thisMonth = moment().format("MMM");
    let thisYear = moment().format("YYYY")
    console.log('now', thisMonth, thisYear)
    
    const _id = Auth.getProfile().data._id

    const { loading, data} = useQuery(QUERY_EMPLOYEE, {variables: {_id}})
    const  employee  = data ? data.employee : {}

    let transArr= []

    const totalSales = Math.round(employee.dollarsSold)

    let units = 0
    let numCustomers 
    let mtdUnits = 0
    if(data ){
        console.log('jfkdjflkaj',employee)
        const customers = employee.customers
        console.log('customers', customers)
        // const numCustomers = customers.length
        // const statuses = customers.status


        const showStatus = (customers) =>{
            const allTrans =customers.transactions

            transArr.push(allTrans)

            console.log('alltrans', allTrans)
            
            const showUnits=(allTrans)=>{
                units= units + allTrans.units
            }
            allTrans.forEach(showUnits)
            
            
        }

        customers.forEach(showStatus)
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
                            <h5 className="center">MTD Sales</h5>
                            <h3 className=" center">
                                $8,650
                            </h3>
                        </div>
                    </div>

                    <div className="col s12 m5 l3">
                        <div className="card-panel hoverable">
                        <h5 className="center">Total Sales</h5>
                            <h3 className=" center">
                                {totalSales}
                            </h3>
                        </div>
                    </div>

                    <div className="col s12 m5 l3">
                        <div className="card-panel hoverable">
                        <h5 className="center">MTD Units</h5>
                            <h3 className=" center">
                                485
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
                        <h5 className="center">Daily Actions</h5>
                            <h3 className=" center">
                                num customers {numCustomers}
                            </h3>
                        </div>
                    </div>

                    <div className="col s12 m5 l3">
                        <div className="card-panel ">
                        <h5 className="center">Total Customers</h5>
                            <h3 className=" center">
                                {employee.customerCount}
                            </h3>
                        </div>
                    </div>
                    <div className="col s12 m5 l3">
                        <div className="card-panel ">
                        <h5 className="center">Avtive Customers</h5>
                            <h3 className=" center">
                                25
                            </h3>
                        </div>
                    </div>
                    <div className="col s12 m5 l3">
                        <div className="card-panel ">
                        <h5 className="center">New Transactions</h5>
                            <h3 className=" center">
                                2
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

export default Dashboard
