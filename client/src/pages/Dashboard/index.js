import React from 'react';
import ClosingPercent from '../../components/ClosingPercent';
import CustomerStatusGraph from '../../components/CustomerStatusGraph';
import SaleByTypeGraph from '../../components/SaleByTypeGraph';


//import sample data


const Dashboard = () => {
    const customers = {
        0: {
            businessName: "Print Max",
            contactName: "Bob Warner",
            status: "active",
            salesman: "Dwight Schrute",
            createdAt: "01/22/2020", /*dont care about date format */
            phone: "925-518-1195",
            email: "bob@printmax.com",
            sales: [
                {
                    product: "Glossy",
                    dollars: 2500,
                    units: 400
                },
                {
                    product: "cardstock",
                    dollars: 3200,
                    units: 250
                },
            ]
        }
    }
    console.log(customers)



    return(
        <section className="container center">
            <h5 className="center">Dwights Sales Dashboard</h5>

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
                        <h5 className="center">YTD Sales</h5>
                            <h3 className=" center">
                                $185,075
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
                        <h5 className="center">YTD Units</h5>
                            <h3 className=" center">
                                9,865
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    

                    <div className="col s12 m5 l3">
                        <div className="card-panel hoverable">
                        <h5 className="center">Daily Actions</h5>
                            <h3 className=" center">
                                25
                            </h3>
                        </div>
                    </div>

                    <div className="col s12 m5 l3">
                        <div className="card-panel ">
                        <h5 className="center">Total Customers</h5>
                            <h3 className=" center">
                                52
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
