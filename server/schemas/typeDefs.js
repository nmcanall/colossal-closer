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