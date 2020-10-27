import React from 'react';
import { VictoryPie, VictoryChart, VictoryLabel, VictoryTheme, } from 'victory';

const SaleByTypeGraph = () => {

    const saleType = [
        {x: "card", y: 450},
        {x: "Glossy", y: 245},
        {x: "Print", y: 196},
    ]

return (
    <div>
        <h3>Sale by Type</h3>
        <svg viewBox="0 0 400 400" >
            <VictoryPie
                colorScale={[ "orange", "cyan", "navy" ]}
                standalone={false}
                width={400} height={400}
                data={saleType}
                innerRadius={70} labelRadius={100}
                style={{ labels: { fontSize: 20, fill: "white"}}}
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

