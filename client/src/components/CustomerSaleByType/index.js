import React from 'react';
import { VictoryPie,  VictoryLabel, } from 'victory';

import { useQuery } from '@apollo/react-hooks'
import { QUERY_CUSTOMER } from '../../utils/queries'
import Auth from '../../utils/auth'

const CustomerSaleByType = (customer) => {
    const singleCustomer = customer.customer
    console.log(singleCustomer)
    



    let glossy = 0;
    let card =0;
    let print =0;

    // if(customer){
    //    
    const transsactions = singleCustomer.transaction
            // for(const transaction of customer.customer.transactions){
                // console.log('singleproducts', transaction.product)
    //             if(transaction.product == 'glossy'){
    //                 glossy += transaction.units
    //             }else if(transaction.product == 'card' ){
    //                 card += transaction.units
    //             }else{
    //                 print += transaction.units
    //             }
    //         }
        // }
    // }
    // console.log('types', print,glossy,card)
    
    

    // const saleType = [
    //     {x: "card", y: card},
    //     {x: "Glossy", y: glossy},
    //     {x: "Print", y: print},
    // ]

return (
    <div>
        <h3>Sale by Type</h3>
        {/* <svg viewBox="0 0 400 400" >
            <VictoryPie
                colorScale={[ "mistyrose", "lightcyan", "lavender" ]}
                standalone={false}
                width={400} height={400}
                data={saleType}
                innerRadius={70} labelRadius={90}
                style={{ labels: { fontSize: 22, fill: "black"}}}
            />
            <circle cx="200" cy="200" r="65" fill="none" stroke="black" strokeWidth={3}/>
            <circle cx="200" cy="200" r="155" fill="none" stroke="black" strokeWidth={3}/>
            <VictoryLabel
                textAnchor="middle" verticalAnchor="middle"
                x={200} y={200}
                style={{fontSize: 30}}
                text="Label"
            />
        </svg> */}
    </div>
    )
}

export default CustomerSaleByType;

