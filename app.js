const express = require("express");
const PORT = 8000;

let products = require("./data");
const app = express();
//
//
app.use(express.json());

//get all products
app.get("/api/products", (req, res) => {
  return res.status(200).json({ products });
});

// get one product
app.get("/api/products/:productId", (req, res) => {
  const { productId } = req.params;
  //find product
  const productFound = products.find((product) => product.id === +productId);
  if (!productFound)
    return res.status(404).json({ message: "product not found!" });
  return res.status(200).json(productFound);
});

app.post("/api/products", (req, res) => {
  //   return res.status(201).json({ products });
  const id = products[products.length - 1].id + 1;
  const newProduct = { id, ...req.body };
  newProduct.push(newProduct);
  return res.status(201).json(newProduct);
});

//delete 1 product
app.delete("/api/products/:productId", (req, res) => {
  const { productId } = req.params;
  products = products.filter((product) => product.id !== +productId);
  return res.status(200).json(products);
});

app.listen(PORT, () => {
  console.log(`Server Running! on port: ${PORT}`);
});
