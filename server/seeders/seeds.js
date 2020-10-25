const faker = require('faker');

const db = require('../config/connection');
const { Employee, Customer } = require('../models');

db.once('open', async () => {
    await Employee.deleteMany({});
    await Customer.deleteMany({});

    // Create employees
    const employeeData = [];
    for (let i = 0; i < 8; i++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const email = firstName.toLowerCase() + "@clossalcloser.com"
        const password = "password123";

        employeeData.push({ firstName, lastName, email, password });
    }
    const createdEmployees = await Employee.collection.insertMany(employeeData);

    // Create customers
    const customerData = [];
    for (let i = 0; i < 30; i++) {

        // Create the basic details
        const businessName = faker.company.companyName();
        const contactName = faker.name.firstName() + " " + faker.name.lastName();
        const phone = "123-456-7890";
        const email = faker.internet.email();

        // Get random employee to create the customer
        const randomIndex = Math.floor(Math.random() * createdEmployees.ops.length);
        const salesman = createdEmployees.ops[randomIndex]._id;
        
        // Get status of the customer
        const randomStatus = Math.floor(Math.random() * 3);
        const status = ["active", "won", "lost"][randomStatus];

        customerData.push({businessName, contactName, phone, email, salesman, status});
    }
    const createdCustomers = await Customer.collection.insertMany(customerData);

    // Relate customers back to employees
    for(let i = 0; i < createdCustomers.ops.length; i++) {
        const employeeId = createdCustomers.ops[i].salesman;

        await Employee.updateOne(
            {_id: employeeId},
            {$push: {customers: createdCustomers.ops[i]._id}}
        );
    };

    // Populate transactions for each customer
    // Loop through each customer
    for(let i = 0; i < createdCustomers.ops.length; i++) {
        const numTransactions = Math.floor(Math.random() * 4); // allow up to three transactions
        for(let j = 0; j < numTransactions; j++) {
            // Create transaction data
            const product = faker.lorem.word();
            const dollars = faker.random.number(1000) + faker.random.number(100)/100;
            const units = faker.random.number(250);
            // Update the customer model
            await Customer.updateOne(
                {_id: createdCustomers.ops[i]},
                {$push: {transactions: {product, dollars, units}}}
            );
        }
    };


    // // create thoughts
    // let createdThoughts = [];
    // for (let i = 0; i < 100; i += 1) {
    //     const thoughtText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    //     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    //     const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    //     const createdThought = await Thought.create({ thoughtText, username });

    //     const updatedUser = await User.updateOne(
    //         { _id: userId },
    //         { $push: { thoughts: createdThought._id } }
    //     );

    //     createdThoughts.push(createdThought);
    // }

    // // create reactions
    // for (let i = 0; i < 100; i += 1) {
    //     const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    //     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    //     const { username } = createdUsers.ops[randomUserIndex];

    //     const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
    //     const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

    //     await Thought.updateOne(
    //         { _id: thoughtId },
    //         { $push: { reactions: { reactionBody, username } } },
    //         { runValidators: true }
    //     );
    // }

    console.log('all done!');
    process.exit(0);
});
