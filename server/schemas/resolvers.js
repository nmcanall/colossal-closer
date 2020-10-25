const {Employee, Customer} = require("../models");

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
            const params = _id ? {_id} : {};
            return Customer.find(params)
                .select("-__v -password")
                .populate("salesman");
        },
        customer: async (parent, {_id}) => {
            return Customer.findOne({_id})
                .select("-__v -password")
                .populate("salesman");
        }
    }
};

module.exports = resolvers;