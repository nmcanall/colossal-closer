const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Employee {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        customers: [Customer]
    }
    type Auth {
        token: ID
        user: Employee
    }
    type Transaction {
        _id: ID
        product: String
        dollars: Int
        units: Int
    }
    type Customer {
        _id: ID
        bussinessName: String
        contactName: String
        status: String
        salesRep: Employee
        createdAt: Int
        phoneNumber: String
        email: String
        sales: [Transaction]
    }
    input AddCustomerInput {
        bussinessName: String!
        contactName: String!
        status: String!
        salesRep: Employee
        phoneNumber: String!
        email: String!
        sales: [Transaction]
    }
    input UpdateCustomerInput {
        bussinessName: String
        contactName: String
        status: String
        salesRep: Employee
        phoneNumber: String
        email: String
        sales: [Transaction]
    }
    type Query {
        employee: Employee
        customer: Customer
        customers: [Customer]
    }
    type Mutation {
        addEmployee(firstName: String!, lastName: String!, email: String!, password: String!, customers:[Customer]): Auth
        updateEmployee(firstName: String, lastName: String, email: String, password: String, customer:[Customer]): Employee
        login(email: Sring!, password: String!): Auth
        addCustomer(input: AddCustomerInput!): Customer
        updateCustomer(input: UpdateCustomerInput!): Customer
    }
`

module.exports = typeDefs