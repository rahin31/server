require('./db/mongoose');
const express = require('express');
const cors = require('cors');

const Cart = require('./models/cart');
const Category = require('./models/category');
const Customer = require('./models/customer');
const Manufacturer = require('./models/manufacturer');
const Medicine = require('./models/medicine');
const MedicineType = require('./models/medicineType');
const Order = require('./models/order');
const Report = require('./models/report');
const Stock = require('./models/stock');

const app = express();
app.use(cors());
app.use(express.json());


app.listen(3005, () => {
    console.log('Server is running!');
});

app.get('/carts', (req, res) => {
    Cart.find().then(carts => res.json(carts)).catch(err => res.json(err));
});

app.get('/categories', (req, res) => {
    Category.find().then(categories => res.json(categories)).catch(err => res.json(err));
});

app.get('/customers', (req, res) => {
    Customer.find().then(customers => res.json(customers)).catch(err => res.json(err));
});

app.get('/manufacturers', (req, res) => {
    Manufacturer.find().then(manufacturers => res.json(manufacturers)).catch(err => res.json(err));
});

app.get('/medicines', (req, res) => {
    Medicine.find().then(medicines => res.json(medicines)).catch(err => res.json(err));
});

app.get('/orders', (req, res) => {
    Order.find().then(orders => res.json(orders)).catch(err => res.json(err));
});

app.get('/reports', (req, res) => {
    Report.find().then(reports => res.json(reports)).catch(err => res.json(err));
});

app.get('/stocks', (req, res) => {
    Stock.find().then(stocks => res.json(stocks)).catch(err => res.json(err));
});

app.get('/admin/dashboard', async (req, res) => {
    try {
      // Count the total number of orders
      const totalOrders = await Order.countDocuments();
  
      // Send the total number of orders as a response
      res.json({ totalOrders });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/admin/add-category', (req, res) => {
    Category.find().then(categories => res.json(categories)).catch(err => res.json(err));
});

app.post('/admin/add-category', async (req, res) => {
    try {
      // Parse the category name from the request body
      const { name } = req.body;
  
      // Create a new category with the parsed name and determined _id
      const newCategory = new Category({
        name: name
      });
  
      // Save the new category to the database
      await newCategory.save();
  
      // Send a success response
      res.status(201).json({ message: 'Category added successfully.' });
    } catch (error) {
      console.error('Error adding category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.get('/admin/add-manufacturer', (req, res) => {
    Manufacturer.find().then(manufacturers => res.json(manufacturers)).catch(err => res.json(err));
});

app.post('/admin/add-manufacturer', async (req, res) => {
    try {
      // Parse the category name from the request body
      const { name, established, headquarter } = req.body;
  
      // Create a new category with the parsed name and determined _id
      const newManufacturer = new Manufacturer({
        name: name,
        established: established,
        headquarter: headquarter
      });
  
      // Save the new category to the database
      await newManufacturer.save();
  
      // Send a success response
      res.status(201).json({ message: 'Manufacturer added successfully.' });
    } catch (error) {
      console.error('Error adding manufacturer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.get('/admin/add-medicine', async (req, res) => {
    try {
        // Fetch only the 'name' attribute from each collection
        const [ manufacturers, categories, medicineTypes ] = await Promise.all([
            Manufacturer.find({}, 'name'),     // Fetch only 'name' from Manufacturer collection
            Category.find({}, 'name'),         // Fetch only 'name' from Category collection
            MedicineType.find({}, 'name')      // Fetch only 'name' from MedicineType collection
        ]);

        // Send the fetched data as a JSON response
        res.json({ manufacturers, categories, medicineTypes });
    } catch (err) {
        // If an error occurs during database operations, send a 500 status code along with an error message
        res.status(500).json({ error: err.message });
    }
});


app.post('/admin/add-medicine', async (req, res) => {
  try {
      const { brandName, genericName, manufacturer, category, medicineType, buyingPrice, sellingPrice } = req.body;

      // Here you would typically validate the incoming data

      // Example: Create a new medicine document in your database
      const newMedicine = new Medicine({
          brandName,
          genericName,
          manufacturer,
          category,
          medicineType,
          buyingPrice,
          sellingPrice
      });

      // Example: Save the new medicine to the database
      await newMedicine.save();

      res.status(201).json({ message: 'Medicine added successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.get('/admin/pending-orders', async (req, res) => {
  try {
      const [ orders, medicines, customers ] = await Promise.all([
          Order.find(),
          Medicine.find(),
          Customer.find()
      ]);

      res.json({ orders, medicines, customers });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.get('/admin/check-stock', async (req, res) => {
  try {
      const [ stocks, medicines ] = await Promise.all([
          Order.find(),
          Medicine.find()
      ]);

      res.json({ stocks, medicines });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.get('/admin/customers-list', async (req, res) => {
  try {
      const [ reports, customers ] = await Promise.all([
          Report.find(),
          Customer.find()
      ]);

      res.json({ reports, customers });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
