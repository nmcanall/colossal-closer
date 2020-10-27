import React from 'react';
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/core";

const ClosingPercent = () =>{
    // const totalCustomers = data.customers.length
    //const customersWon = 
    const percentage= 45
    //customersWon / totalCustomers

//need to figure out how to make chakra UI theme to change color
    // let color = '';
    //     if (percentage > 15){
    //         color = 'red'
    //     }else if(percentage > 15 && percentage < 30 ){
    //         color = 'yellow'
    //     }else{color = 'green'}

    return(
        <div>
            <h3>Closing Percentage</h3>
            <CircularProgress 
                value={45} 
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