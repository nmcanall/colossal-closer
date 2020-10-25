const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type Employee {
        _id: ID
        firstName: String
        lastName: String
        email: String
        createdAt: String
        customerCount: Int
        customers: [Customer]
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
        addEmployee(
            firstName: String!,
            lastName: String!,
            email: String!,
            password: String!    
        ): Employee
    }
`;

module.exports = typeDefs;