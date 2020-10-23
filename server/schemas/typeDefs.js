const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Transaction {
        _id: ID
        product: String
        dollars: Int
        units: Int
    }
    type Customer {
        _id: ID
        bussiness_name: String
        contact_name: String
        status: String
        sales_rep: String
        createdAt: Int
        phone_number: String
        email: String
        sales: [Transaction]
    }
    type Query {
        customer: Customer
        customers: [Customer]
    }
`

module.exports = typeDefs