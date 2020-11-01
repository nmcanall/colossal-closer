import React from 'react';
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/core";

import {useQuery} from '@apollo/react-hooks';
import {QUERY_EMPLOYEE} from '../../utils/queries';

import Auth from '../../utils/auth'

const ClosingPercent = () =>{

    const _id = Auth.getProfile().data._id

    const { loading, data} = useQuery(QUERY_EMPLOYEE, {variables: {_id}})
    const  employee  = data ? data.employee : {}
    let percentage= Math.round((employee.wonCustomerCount/employee.customerCount) * 100)
    console.log('percent customer', employee.customerCount, employee.wonCustomerCount)
    if(employee.wonCustomerCount == 0){
        percentage=0
    }
    

    return(
        <div>
            <h3>Closing Percentage</h3>
            <CircularProgress 
                value={percentage} 
                color="green"
                size= "17em"
                thickness={0.4}
                angle={-90}
            >
                <CircularProgressLabel>{percentage}%</CircularProgressLabel>
            </CircularProgress>
        </div>
    )
}

export default ClosingPercent;