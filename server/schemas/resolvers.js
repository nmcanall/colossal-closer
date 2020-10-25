const { AuthenticationError } = require("apollo-server-express");
const {Employee, Customer} = require("../models");
const { signToken } = require('../utils/auth');
const { findOne } = require("../models/Employee");

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
        
        login: async (parent, {email, password}) => {
            // Find the employee by email
            const employee = await Employee.findOne({email});
            // If email is not found, throw an error
            if(!employee) {
                throw new AuthenticationError("Incorrect credentials");
            }
            // Boolean for if the password is correct or not
            const correctPw = await employee.isCorrectPassword(password);
            // If password is incorrect, throw an error
            if(!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }
            // Sign the token for an authenticated employee
            const token = signToken(employee);
            return {token, employee};
        },
        addEmployee: async (parent, args) => {
            const employee = await Employee.create(args);
            const token = signToken(employee);
            return {token, employee};
        },
        // Use context to get the employee creating the customer
        addCustomer: async (parent, args, { user }) => {
            // Only allow an authenticated employee add a customer
            checkLoggedIn(user)
            // Create the new customer
            const customer = await Customer.create({...args, salesman: user._id});

            // Add the customer to the employee's customer list
            await Employee.findOneAndUpdate(
                {_id: user._id},
                {$push: {customers: customer._id}},
                {new: true}
            )

            return customer;
        },
        updateCustomer: async (parent, args, { user }) => {
            checkLoggedIn(user)
            
            if (args.salesman) {
                // if we're re-assigning a customer from one employee to another,
                // we need to remove the customer from the old employee and add them to the new one
                const customer = await Customer.findOneAndUpdate({_id: args._id},{...args})
                await Employee.findOneAndUpdate(
                    {_id: customer.salesman._id},
                    {$pull: {customers: customer._id}}
                )
                await Employee.findOneAndUpdate(
                    {_id: args.salesman},
                    {$push: {customers: customer._id}},
                    {new: true}
                )
                const updatedCustomer = await Customer.findOne({_id: customer._id}).populate("salesman")
                return updatedCustomer
            }
            // otherwise, we only need to update Customer
            const customer = await Customer.findOneAndUpdate(
                {_id: args._id},
                {...args},
                {new: true}
            )
            return customer
        }
    }
};

module.exports = resolvers;
