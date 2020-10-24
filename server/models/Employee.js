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
        customers: {
            type: Schema.Types.ObjectId,
            ref: "Customer"
        }
    },
    {
      toJSON: {
        virtuals: true
      }
    }
);

// Counts the number of customers from an employee has/is working with
// More detail will be needed for more precise counts for employee/customer relations (won, lost, active, etc)
employeeSchema.virtual("customerCount").get(function() {
    return this.customers.length;
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const Employee = model("Employee", employeeSchema);

module.exports = Employee;