import React from 'react';
import { VictoryBar, VictoryChart, VictoryTheme, } from 'victory';

import {useQuery} from '@apollo/react-hooks';
import {QUERY_EMPLOYEE} from '../../utils/queries';

import Auth from '../../utils/auth'


   
const CustomerStatusGraph = () => {

    const _id = Auth.getProfile().data._id

    const { loading, data} = useQuery(QUERY_EMPLOYEE, {variables: {_id}})
    const  employee  = data ? data.employee : {}

    const won = employee.wonCustomerCount
    // console.log('wonnnnn', won)
    const lost = employee.lostCustomerCount
    // console.log('lost', ost)
    const active = employee.customerCount - won - lost;


    const custStatus =[
        {status: 'Won', number: won},
        {status: 'Active', number: active},
        {status: 'Lost', number: lost}
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