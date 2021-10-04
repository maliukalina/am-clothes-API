const { response } = require("express")
const { request } = require("express")
const express = require("express")

const {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct} = require("./src/products")
const app = express()
app.use(express.json())

//take a request and response for a single endpoint..

//app.get("/products",(req,res) => getAllProducts(req,res))
app.get("/products/:id", getProductById)
app.patch("/products/:id", updateProduct)
app.delete("/products/:id", deleteProduct)
app.get("/products",getAllProducts)
app.post("/products", createProduct)




app.listen(3000, () => {
  console.log("Listening on http://localhost:3000/")
})