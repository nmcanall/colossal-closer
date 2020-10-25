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
        },

        // Transaction status must be offered, denied, or accepted
        status: {
            type: String,
            default: "offered",
            validate: {
                validator: function(input) {
                    return input === "offered" || input === "denied" || input === "accepted";
                },
                message: "Status must be offered, denied, or accepted."
            }
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

        // Name of employee (note: only a logged in employee will be able to create a customer, so it will be filled by context)
        salesman: {
            type: String,
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
        if(this.transactions[i].status === "accepted") {
            value += this.transactions[i].dollars;
        }
    }
    return value;
});

// Returns total dollars offered to the customer
customerSchema.virtual("dollarsOffered").get(function() {
    let value = 0;
    for(let i = 0; i < this.transactions.length; i++) {
        if(this.transactions[i].status === "offered") {
            value += this.transactions[i].dollars;
        }
    }
    return value;
});

// Returns total dollars denied by customer
customerSchema.virtual("dollarsDenied").get(function() {
    let value = 0;
    for(let i = 0; i < this.transactions.length; i++) {
        if(this.transactions[i].status === "denied") {
            value += this.transactions[i].dollars;
        }
    }
    return value;
});

// Returns number of transactions won with the customer
customerSchema.virtual("transactionsWon").get(function() {
    let count = 0;
    for(let i = 0; i < this.transactions.length; i++) {
        if(this.transactions[i].status === "accepted") {
            count++;
        }
    }
    return count;
});

// Returns number of transactions offered to the customer
customerSchema.virtual("transactionsOffered").get(function() {
    let count = 0;
    for(let i = 0; i < this.transactions.length; i++) {
        if(this.transactions[i].status === "offered") {
            count++;
        }
    }
    return count;
});

// Returns number of transactions denied by customer
customerSchema.virtual("transactionsDenied").get(function() {
    let count = 0;
    for(let i = 0; i < this.transactions.length; i++) {
        if(this.transactions[i].status === "denied") {
            count++;
        }
    }
    return count;
});

const Customer = model("Customer", customerSchema);

module.exports = Customer;