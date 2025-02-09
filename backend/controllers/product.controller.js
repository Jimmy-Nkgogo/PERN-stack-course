import { sql } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`SELECT * FROM products ORDER BY created_at DESC`;

    res.status(200).json({ success: true, data: products });
    console.log("Fetched products", products);
  } catch (error) {
    console.log("Error in getAllProducts", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res
    .status(400)
    .json({ success: false, message: "All fields are required" });
  }
  try {
    const newProduct = await sql`
    INSERT INTO products (name,price,image) VALUES (${name},${price},${image})
    RETURNING *
    `;
    
    console.log("new product added: ", newProduct);
    return res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log("Error in createProduct", error);
    return res
    .status(400)
    .json({ success: false, message: "Something went wrong" });
  }
};
export const getProduct = async (req, res) => {
  const {id} = req.params;

  try {
    const product = await sql`
    SELECT * FROM products WHERE id = ${id}
    
    `
    return res.status(200).json({ success: true, data: product[0]})
  } catch (error) {
    console.log("Error in getProduct function", error);
    res.status(500).json({success: false, message: "Internal Server Error"})
  }
};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};
