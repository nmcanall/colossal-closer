import React from 'react';
import { VictoryPie,  VictoryLabel, } from 'victory';

import { useQuery } from '@apollo/react-hooks'
import { QUERY_CUSTOMERS } from '../../utils/queries'
import Auth from '../../utils/auth'

const SaleByTypeGraph = () => {

    const _id = Auth.getProfile().data._id
    
    console.log('needtoseeformat', _id)
    const { loading, data} = useQuery(QUERY_CUSTOMERS, {variables: {_id}})
    const  customers  = data ? data.customers : {}
    console.log('customers',customers)

    let glossy = 0;
    let card =0;
    let print =0;

    const saleType = [
        // {x: "card", y: card},
        // {x: "Glossy", y: glossy},
        // {x: "Print", y: print},
    ]
    if(data){
        // console.log('transactions',customers.transactions)
        // const transactions = customers.transaction
        for(const customer of customers){
            for(const transaction of customer.transactions){
                // console.log('products', transaction.product)
                if(transaction.product == 'glossy'){
                    glossy += transaction.units
                }else if(transaction.product == 'card' ){
                    card += transaction.units
                }else{
                    print += transaction.units
                }
            }
        }
    }
    console.log('deeezzztypes', print,glossy,card)
    
    if(glossy > 0) {
        saleType.push({x:"glossy", y: glossy})
    }
    if(card > 0) {
        saleType.push({x:"card", y: card})
    }
    if(glossy > 0) {
        saleType.push({x:"print", y: print})
    }

    
    if(loading){return(<div>Loading...</div>)}
return (
    <div>
        <h3>Sale by Type</h3>
        <svg viewBox="0 0 400 400" >
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
        </svg>
    </div>
    )
}

export default SaleByTypeGraph;

