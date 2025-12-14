import Sale from '../models/Sale.js';
import Product from '../models/Product.js';

// This function will handle a cart of multiple items
export const createSaleTransaction = async (req, res) => {
  // We expect a payload like: { items: [{ productId, quantity }] }
  const { items } = req.body;
  const ownerId = req.user.id; // From the authentication middleware

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart cannot be empty" });
  }

  try {
    // This is a transaction. All steps must succeed or none will.
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product: ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`);
      }
    }

    // If all validations pass, proceed with the updates
    for (const item of items) {
      const product = await Product.findById(item.productId);
      
      // 1. Decrease the product's stock
      product.stock -= item.quantity;
      await product.save();

      // 2. Create a detailed sale record
      const newSale = new Sale({
        productId: item.productId,
        quantity: item.quantity,
        priceAtSale: product.price,
        totalAmount: product.price * item.quantity,
        user_id: ownerId,
      });
      await newSale.save();
    }

    res.status(201).json({ message: "Sale recorded successfully and inventory updated." });

  } catch (error) {
    // If any step fails, this catch block will be triggered.
    res.status(400).json({ message: "Transaction Failed", error: error.message });
  }
};

/**
 * 📈 Aggregate total sales per day
 * Used for: SalesAnalysisChart.jsx
 */
export const getDailySales = async (req, res) => {
  try {
    const dailySales = await Sale.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$saleDate" } },
          actualSales: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formatted = dailySales.map((item) => ({
      date: item._id,
      actualSales: item.actualSales,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching daily sales:", error);
    res.status(500).json({ message: "Error fetching daily sales data" });
  }
};

/**
 * 🧠 Aggregate demand per product per day
 * Used for: DemandPredictionChart.jsx
 */
export const getProductDemand = async (req, res) => {
  try {
    const demandData = await Sale.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$saleDate" } },
            product: "$product.name",
          },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          products: {
            $push: {
              name: "$_id.product",
              quantity: "$totalQuantity",
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // ✅ Convert into Recharts-friendly structure
    const formatted = demandData.map((entry) => {
      const row = { date: entry._id };
      entry.products.forEach((p) => {
        row[p.name] = p.quantity;
      });
      return row;
    });

    console.log("✅ Final Demand Data Sent to Frontend:", formatted);
    res.status(200).json(formatted);
  } catch (error) {
    console.error("❌ Error fetching demand data:", error);
    res.status(500).json({ message: "Error fetching demand data" });
  }
};


import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const runSalesForecast = (req, res) => {
  const scriptPath = path.join(__dirname, "../../ml/predict_sales.py");

  const py = spawn("python3", [scriptPath]);

  let output = "";

  py.stdout.on("data", (data) => {
    output += data.toString();
  });

  py.stderr.on("data", (data) => {
    console.error("Python Error:", data.toString());
  });

  py.on("close", () => {
    try {
      const result = JSON.parse(output);
      console.log(output);
      res.json({ forecast: result });
    } catch (e) {
      res.status(500).json({ error: "Failed to parse Python output" });
    }
  });
};
