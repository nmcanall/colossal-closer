import React from 'react';

const CustomerList = () => {
    const customers= [
        {
            name: "Global Paper",
            sales: 34550,
            phone: '925-545-9685'
        },
        {
            name: "Print-R-Us",
            sales: 18450,
            phone: '415-623-4584'
        },
        {
            name: "Big Boy Office",
            sales: 8950,
            phone: '626-385-2142'
        },
    ]
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Phone</th>
                        <th>Sales</th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((customer, i) => (
                        <tr>
                            <td>{customer.name}</td>
                            <td>{customer.phone}</td>
                            <td>${customer.sales}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}

export default CustomerList;