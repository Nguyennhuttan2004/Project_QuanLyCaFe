const Product = require("../../models/Product.js");

// Xác định chiến lược sắp xếp
// quy ước 1 là tăng dần và -1 là giảm dần
const sortingStrategies = {
  "price-lowtohigh": { price: 1 }, 
  "price-hightolow": { price: -1 },
  "title-atoz": { title: 1 },
  "title-ztoa": { title: -1 },
};

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};
    if (category.length) {
      filters = { category: { $in: category.split(",") } };
    }
    if (!category.length) {
      filters = { category: "bestSeller" };
    }

    const sort = sortingStrategies[sortBy] || sortingStrategies["price-lowtohigh"];

    console.log("Filters:", filters);
    console.log("Sort Strategy:", sort);

    const products = await Product.find(filters).sort(sort);
    console.log("Sorted Products:", products);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
