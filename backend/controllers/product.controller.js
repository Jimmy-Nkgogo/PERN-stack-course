import { sql } from "../config/db.js"

export const getAllProducts = async (req, res) => {
    try {
       const products = await sql`SELECT * FROM products ORDER BY created_at DESC`

       res.status(200).json({success: true, data: products});
       console.log("Fetched products", products)
    } catch (error) {
        
    }
    
}
export const getProduct = async (req, res) => {
    // GET ALL PRODUCTS
    
}
export const createProduct = async (req, res) => {
    // CREATE A PRODUCT
}

export const updateProduct = async (req, res ) => {

}

export const deleteProduct = async (req, res ) => {

}
