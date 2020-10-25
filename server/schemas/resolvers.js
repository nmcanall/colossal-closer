const {Employee, Customer} = require("../models");
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')

function checkLoggedIn(user) {
    if (!user) {
        throw new AuthenticationError("You're not logged in")
    }
}

const resolvers = {
    Query: {
        employees: async () => {
            return Employee.find()
                .select("-__v -password")
                .populate("customers");
        },
        employee: async (parent, {_id}) => {
            return Employee.findOne({_id})
                .select("-__v -password")
                .populate("customers")
        },
        customers: async (parent, {_id}) => {
            // If employeeId is passed, set params and search for that.
            // Otherwise, params is empty and search for all customers
            const params = _id ? {salesman: {_id}} : {};
            return Customer.find(params)
                .select("-__v -password")
                .populate("salesman");
        },
        customer: async (parent, {_id}) => {
            return Customer.findOne({_id})
                .select("-__v -password")
                .populate("salesman");
        }
    },
    Mutation: {
        // addEmployee(firstName: String!, lastName: String!, email: String!, password: String!, customers:[Customer]): Auth
        // updateEmployee(firstName: String, lastName: String, email: String, password: String, customer:[Customer]): Employee
        // login(email: Sring!, password: String!): Auth
        // addCustomer(input: AddCustomerInput!): Customer
        // updateCustomer(input: UpdateCustomerInput!): Customer
        
    }
};

module.exports = resolvers;
