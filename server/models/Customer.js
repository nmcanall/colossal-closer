const { Schema, model } = require('mongoose');
const moment = require("moment");

// Structure for an offer or sale to a single customer
const transactionSchema = new Schema(
    {
        // Type of product being sold/offered
        product: {
            type: String,
            required: true,
            trim: true
        },

        // Dollar value of sale/offer
        dollars: {
            type: Number,
            required: true,
            min: 0
        },

        // Number of units of that item sold
        units: {
            type: Number,
            required: true,
            min: 0
        },

        // Date and time sale/offer was made
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
        }
    }
);

// History of contacts between an employee and customer
const contactSchema = new Schema(
    {
        // The type of contact made (e.g. phone, email, mail, face-to-face)
        type: {
            type: String,
            required: true
        },

        // Note for a particular contact
        note: {
            type: String
        },

        // Time the contact was made
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
        },
    }
);

// Structure of a customer object
const customerSchema = new Schema(
    {
        // Name of business we're contacting
        businessName: {
            type: String,
            required: true
        },

        // Name of the individual at the company we're talking to
        contactName: {
            type: String,
        },

        // Phone number of contact
        phone: {
            type: String,
            validate: {
                validator: function(v) {
                    return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: "Phone number must be in format '123-456-7890'"
            }
        },

        // Email of the customer
        email: {
            type: String,
            match: [/.+@.+\..+/, 'Must be a valid email address.']
        },

        // Employee (note: only a logged in employee will be able to create a customer, so it will be filled by context)
        salesman: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        },

        // Time the customer was created (date of first contact)
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
        },

        // Customer status must be active, won, or lost
        status: {
            type: String,
            default: "active",
            validate: {
                validator: function(input) {
                    return input === "active" || input === "won" || input === "lost";
                },
                message: "Customer status must be active, won, or lost."
            }
        },

        // Transactions made between the employee and customer
        transactions: [transactionSchema],

        // Contacts made between the employee and customer
        contacts: [contactSchema]
    },
    {
      toJSON: {
        virtuals: true
      }
    }
);

// Returns total dollars sold to the customer
customerSchema.virtual("dollarsSold").get(function() {
    let value = 0;
    for(let i = 0; i < this.transactions.length; i++) {
        value += this.transactions[i].dollars;
    }
    return value;
});

// Returns number of transactions won with the customer
customerSchema.virtual("transactionsWon").get(function() {
    return this.transactions.length;
});

const Customer = model("Customer", customerSchema);

module.exports = Customer;