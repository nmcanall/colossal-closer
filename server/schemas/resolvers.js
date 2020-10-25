const { AuthenticationError } = require("apollo-server-express");
const {Employee, Customer} = require("../models");
const {signToken} = require("../utils/auth");

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
        login: async (parent, {email, password}) => {
            // Find the user by email
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
        }

    }
};

module.exports = resolvers;