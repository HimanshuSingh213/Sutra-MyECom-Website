const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// for testing on mobile only 
// app.use(cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
//   }));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch(err => console.log(err));

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    subtitle:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    poster: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        Ref: "User",
    }

},
    { timestamps: true },
);

const Product = mongoose.model("Product", productSchema, "Products");


// Admin Key
const Admin_Key = process.env.ADMIN_KEY;

const requireAdmin = (req, res, next) => {
    const key = req.headers["admin-key"];

    if (key !== Admin_Key) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    next();
};

app.get("/", async (req, res) => {
    try {
        console.log("Fetching products from database...");
        const products = await Product.find();
        console.log(`Found ${products.length} products`);
        res.json(products);

        if (products.length === 0) throw new Error("Server Side Issue!!!");

    }
    catch (err) {
        console.error("Error fetching products:");
        console.error(err);
        res.status(500).json({ error: "Server error", details: err.message });
    }
});

app.post("/api/products", requireAdmin, async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();

        res.status(201).json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create product" });
    }
});

app.put("/api/products/:id", requireAdmin, async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Update failed" });
    }
});

app.delete("/api/products/:id", requireAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Delete failed" });
    }
})

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
