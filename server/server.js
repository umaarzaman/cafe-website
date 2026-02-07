const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const menuDataPath = path.join(dataDir, 'menu.json');
const ordersDataPath = path.join(dataDir, 'orders.json');

// Helper to read data
const readData = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) {
            // Create file if it doesn't exist
            fs.writeFileSync(filePath, '[]');
            return [];
        }
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading file ${filePath}:`, err);
        return [];
    }
};

// Helper to write data
const writeData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(`Error writing to file ${filePath}:`, err);
    }
};

// GET Menu
app.get('/api/menu', (req, res) => {
    const menu = readData(menuDataPath);
    res.json(menu);
});

// POST Order
app.post('/api/orders', (req, res) => {
    const { customer, items, total } = req.body;

    // Basic validation
    if (!customer || !items || items.length === 0) {
        return res.status(400).json({ error: "Invalid order data" });
    }

    const orders = readData(ordersDataPath);
    const newOrder = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        customer,
        items,
        total,
        status: 'pending'
    };

    orders.push(newOrder);
    writeData(ordersDataPath, orders);

    res.status(201).json({ message: "Order placed successfully", orderId: newOrder.id });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
