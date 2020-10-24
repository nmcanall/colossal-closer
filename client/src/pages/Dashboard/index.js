import React from 'react';

import { Chart, Ticks, Layer, Bars,  } from 'rumble-charts';
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

    const salesType = [
        {
            name: 'Printer',
            data: [48]
        },
        {
            name: 'glossy',
            data: [34]
        },
        {
            name: 'cardstock',
            data: [29]

        }
]

    return(
        <section>
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
                </div>

                <div className="row">
                    <div className="col s12 m5 l3">
                        <div className="card-panel hoverable">
                        <h5 className="center">YTD Units</h5>
                            <h3 className=" center">
                                9,865
                            </h3>
                        </div>
                    </div>

                    <div className="col s12 m5 l3">
                        <div className="card-panel hoverable">
                        <h5 className="center">Daily Actions</h5>
                            <h3 className=" center">
                                25
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
                    <div className="col s12 m5">
                        <div className="card-panel hoverable"  style={{fontFamily:'sans-serif',fontSize:'0.8em'}} >
                            <Chart width={600} height={300} series={salesType} minY={0}>
                                <Layer width='80%' height='90%' position='top center'>
                                        <Ticks
                                        axis='y'
                                        lineLength='100%'
                                        lineVisible={true}
                                        lineStyle={{stroke:'lightgray'}}
                                        labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray'}}
                                        labelAttributes={{x: -5}}
                                        />
                                        <Ticks
                                        axis='x'
                                        label={({index, props}) => props.series[index].name}
                                        labelStyle={{textAnchor:'middle',dominantBaseline:'text-before-edge',fill:'lightgray'}}
                                        labelAttributes={{y: 3}}
                                        />
                                        <Bars
                                        groupPadding='3%'
                                        innerPadding='0.5%'
                                        />
                                    </Layer>
                            </Chart>
                        </div>
                    </div>

                    <div className="col s12 m5">
                        <div className="card-panel hoverable">
                        <h5 className="center">YTD Units</h5>
                            <h3 className=" center">
                                9,865
                            </h3>
                        </div>
                    </div>
                </div>

            </div>
        </section>

    )
}

export default Dashboard
