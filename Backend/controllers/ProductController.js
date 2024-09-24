const Product = require("../models/ProductSchema");

const AllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const SingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const ProductCreate = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//   try {
//     let result = await Product.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );

//     res.send({
//       status: true,
//       message: "Product Updated Successfully",
//       result,
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

const DeleteProduct = async (req, res) => {
  try {
    // const { id } = req.params;

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produdct not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//     res.send({
//       status: true,
//       message: "Product Deleted Successfully",
//       deletedProduct,
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

module.exports = {
  ProductCreate,
  AllProducts,
  SingleProduct,
  UpdateProduct,
  DeleteProduct,
};
