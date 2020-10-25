const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')

function checkLoggedIn(user) {
    if (!user) {
        throw new AuthenticationError("You're not logged in")
    }
}
const resolvers = {
    Query: {
        employee: async (parent, { _id }) => {

        },
        customer: async (parent, { _id }) => {

        },
        customers: async () => {

        }

    },
    Mutation: {
        // addEmployee(firstName: String!, lastName: String!, email: String!, password: String!, customers:[Customer]): Auth
        // updateEmployee(firstName: String, lastName: String, email: String, password: String, customer:[Customer]): Employee
        // login(email: Sring!, password: String!): Auth
        // addCustomer(input: AddCustomerInput!): Customer
        // updateCustomer(input: UpdateCustomerInput!): Customer
        
    }
}

module.exports = resolvers