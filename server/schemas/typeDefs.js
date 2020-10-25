<<<<<<< HEAD
const { gql } = require('apollo-server-express')
=======
const {gql} = require("apollo-server-express");
>>>>>>> b1e43ac96a4e6e1b4737c371bf5fd19d6682a99c

const typeDefs = gql`
    type Employee {
        _id: ID
        firstName: String
        lastName: String
        email: String
<<<<<<< HEAD
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
=======
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
`;


// transactions: [Transaction]
// contacts: [Contact]
    // type Mutation {
    //     login(email: String!, password: String!): Auth
    //     addEmployee(
    //         firstName: String!,
    //         lastName: String!,
    //         email: String!, 
    //         password: String!
    //     ): Auth
    //     addThought(thoughtText: String!): Thought
    //     addReaction(thoughtId: ID!, reactionBody: String!): Thought
    //     addFriend(friendId: ID!): User
    // }

module.exports = typeDefs;
>>>>>>> b1e43ac96a4e6e1b4737c371bf5fd19d6682a99c
