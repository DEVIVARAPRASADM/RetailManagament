// import  Customer from "../models/Customer";

// // GET all customers
// const getCustomers = async (req, res) => {
//   try {
//     const customers = await Customer.find();
//     res.json(customers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // POST create customer
// const createCustomer = async (req, res) => {
//   const { name, email, phone } = req.body;
//   try {
//     const newCustomer = new Customer({ name, email, phone });
//     await newCustomer.save();
//     res.status(201).json(newCustomer);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = { getCustomers, createCustomer };
