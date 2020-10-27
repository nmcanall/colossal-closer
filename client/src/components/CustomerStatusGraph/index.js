import React from 'react';
import { VictoryBar, VictoryChart, VictoryTheme, } from 'victory';

const CustomerStatusGraph = () => {
    const custStatus =[
        {status: 'Won', number: 12},
        {status: 'Active', number: 10},
        {status: 'Lost', number: 20}
];

    return(
        <div>
            <h3>Customer Status</h3>
            <VictoryChart
            domainPadding={20}
            theme={VictoryTheme.material}
            >   
                
                <VictoryBar horizontal
                    style={{ data: { fill: "#2a752e" } }}
                    labels={({ datum }) => datum.number}
                    data= {custStatus}
                    x="status"
                    y="number"
                />
            </VictoryChart>
        </div>
    )
}

export default CustomerStatusGraph;