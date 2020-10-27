const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require("moment");

const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    // Email must be unique and use colossalcloser.com
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@colossalcloser\.com/, 'Must use a valid Colossal Closer email address!']
    },

    // Password is created by the employee and hashed for storage
    password: {
      type: String,
      required: true,
      minlength: 5
    },

    // Created at shows when the employee joined the company, and therefore, employee's tenure
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
    },

    // Array of all customers defined in the Customer model
    customers: [{
      type: Schema.Types.ObjectId,
      ref: "Customer"
    }]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// Counts the number of customers from an employee has/is working with
employeeSchema.virtual("customerCount").get(function() {
  return this.customers.length;
});

// Counts the number of active customers for a given employee
employeeSchema.virtual("activeCustomerCount").get(function() {
  let count = 0;
  for(let i = 0; i < this.customers.length; i++) {
    if(this.customers[i].status === "active") {
      count++;
    }
  }
  return count;
});

// Counts the number of won customers for a given employee
employeeSchema.virtual("wonCustomerCount").get(function() {
  let count = 0;
  for(let i = 0; i < this.customers.length; i++) {
    if(this.customers[i].status === "won") {
      count++;
    }
  }
  return count;
});

// Counts the number of lost customers for a given employee
employeeSchema.virtual("lostCustomerCount").get(function() {
  let count = 0;
  for(let i = 0; i < this.customers.length; i++) {
    if(this.customers[i].status === "lost") {
      count++;
    }
  }
  return count;
});

// Counts the total dollars sold by a given employee
employeeSchema.virtual("dollarsSold").get(function() {
  let dollars = 0;
  // Loop through each customer for the dollars sold value
  for(let i = 0; i < this.customers.length; i++) {
    dollars += this.customers[i].dollarsSold;
  }
  return dollars;
});

// set up pre-save middleware to create password
employeeSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
employeeSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const Employee = model("Employee", employeeSchema);

module.exports = Employee;