const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Employee {
        _id: ID
        firstName: String
        lastName: String
        email: String
        createdAt: String
        customerCount: Int
        activeCustomerCount: Int
        wonCustomerCount: Int
        lostCustomerCount: Int
        dollarsSold: Float
        customers: [Customer]
    }
    type Auth {
        token: ID
        employee: Employee
    }
    
    type Transaction {
        _id: ID
        product: String
        dollars: Float
        units: Int
        createdAt: String
    }
    type Contact {
        _id: ID
        type: String
        
        note: String
        createdAt: String
    }
    type Customer {
        _id: ID
        businessName: String
        contactName: String
        phone: String
        email: String
        salesman: Employee
        createdAt: String
        status: String
        dollarsSold: Float
        transactionsWon: Int
        transactions: [Transaction]
        contacts: [Contact]
    }
    type Query {
        employees: [Employee]
        employee(_id: ID!): Employee
        customers(_id: ID): [Customer]
        customer(_id: ID!): Customer
    }
    type Mutation {
        login(email: String!, password: String!): Auth

        addEmployee(
            firstName: String!,
            lastName: String!,
            email: String!,
            password: String!    
        ): Auth

        addCustomer(
            businessName: String!
            contactName: String
            phone: String
            email: String
            status: String
        ): Customer

        updateCustomer(
            _id: ID!
            businessName: String
            contactName: String
            salesman: ID
            phone: String
            email: String
            status: String
        ): Customer
    }
`;


module.exports = typeDefs;
